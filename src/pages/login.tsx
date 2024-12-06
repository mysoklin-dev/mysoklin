import { yupResolver } from '@hookform/resolvers/yup';
import { FacebookTag, Google } from 'iconoir-react';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { setCookie } from 'typescript-cookie';

import BaseAlertDialog from '@/components/Base/AlertDialog';
import BaseInput from '@/components/Base/Input';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import { useAlertDialog } from '@/hooks/use-alert-dialog';
import Yup from '@/lib/yup';
import { useGetListAuthMethods, useLogin } from '@/services/userService';

const formSchema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const RegisterPage = () => {
  const { props: alertDialogProps, showAlert } = useAlertDialog();
  const { data: listAuthMethods, isLoading: loadingAuthMethods } =
    useGetListAuthMethods();

  const { mutate: mutateLogin } = useLogin({
    onSuccess(val) {
      setCookie('token', val.token);
      showAlert({
        open: true,
        message: 'Login success!',
        loading: false,
        type: 'success',
        onClose: () => {
          window.location.href = '/profile';
        },
      });
    },
    onError() {
      showAlert({
        open: true,
        message: 'Login failed!',
        loading: false,
        type: 'error',
      });
    },
  });

  const form = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: Yup.InferType<typeof formSchema>) => {
    mutateLogin({ payload: values });
    showAlert({
      open: true,
      message: 'Logging in...',
      loading: true,
      type: 'default',
    });
  };

  return (
    <>
      <BaseAlertDialog {...alertDialogProps} />
      <div className="grid h-full w-full grid-cols-1 gap-8 bg-background px-8 py-6 text-base lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-10">
        <div className="relative">
          <Image
            className="h-auto w-full rounded-2xl object-cover object-center"
            src="/assets/images/login-image.jpg"
            width={800}
            height={622}
            alt="Login Image"
          />
          <div className="absolute left-0 top-0 px-6 py-8 text-white lg:px-10 lg:py-20">
            <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
              Get to know about SoKlin
            </h2>
            <p className="leading-relaxed">
              An invitation to be a member of
              <br /> Smart Mom with SoKlin.
            </p>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold lg:text-3xl">Welcome!</h2>
            <p className="leading-relaxed text-gray-500">
              Sign in to your SoKlin account
            </p>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Controller
                control={form.control}
                name="email"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="email"
                    placeholder="Email"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="password"
                    placeholder="Password"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue p-4 text-white transition duration-300 hover:bg-blue/90"
              >
                Log In
              </button>
              <div className="flex items-center">
                <hr className="flex-1 border-t border-gray-300" />
                <p className="mx-4 text-gray-500">OR</p>
                <hr className="flex-1 border-t border-gray-300" />
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                {listAuthMethods &&
                  !loadingAuthMethods &&
                  listAuthMethods.authProviders.map((provider) => (
                    <a
                      key={`provider-${provider.codeChallenge}`}
                      href={
                        provider.authUrl + process.env.NEXT_PUBLIC_REDIRECT_URL
                      }
                      className="flex w-full items-center justify-center gap-1 rounded-lg border border-blue bg-white p-4 text-blue transition duration-300 hover:bg-blue hover:text-white"
                      onClick={() =>
                        localStorage.setItem(
                          'provider',
                          JSON.stringify(provider)
                        )
                      }
                    >
                      {provider.name === 'google' && (
                        <Google height={24} width={24} />
                      )}
                      {provider.name === 'facebook' && (
                        <FacebookTag height={24} width={24} />
                      )}
                      Sign up with {provider.name}
                    </a>
                  ))}
              </div>
              <p className="text-center text-gray-500">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-blue underline decoration-wavy"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ProductsCarousel />
      <LatestUpdates />
    </>
  );
};

export default RegisterPage;
