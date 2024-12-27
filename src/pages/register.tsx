import { yupResolver } from '@hookform/resolvers/yup';
import { FacebookTag, Google } from 'iconoir-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import BaseAlertDialog from '@/components/Base/AlertDialog';
import BaseCheckbox from '@/components/Base/Checkbox';
import BaseInput from '@/components/Base/Input';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import { useAlertDialog } from '@/hooks/use-alert-dialog';
import Yup from '@/lib/yup';
import { useCreateUser, useGetListAuthMethods } from '@/services/userService';

export const formSchema = Yup.object({
  name: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  province: Yup.string().required().label('Province'),
  city: Yup.string().required().label('City'),
  address: Yup.string().required().label('Address'),
  post_code: Yup.string().required().label('Postal Code'),
  password: Yup.string().required().min(8).label('Password'),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password must match')
    .label('Confirm Password'),
  agreement: Yup.boolean().oneOf([true], 'You must agree to the terms'),
});

const RegisterPage = () => {
  const router = useRouter();
  const { props: alertDialogProps, showAlert } = useAlertDialog();
  const { data: listAuthMethods, isLoading: loadingAuthMethods } =
    useGetListAuthMethods();

  const { mutate: mutateCreateUser } = useCreateUser({
    onSuccess() {
      showAlert({
        open: true,
        message: 'Register success!',
        loading: false,
        type: 'success',
        onClose: () => {
          router.push('/login');
        },
      });
    },
    onError() {
      showAlert({
        open: true,
        message: 'Register failed!',
        loading: false,
        type: 'error',
      });
    },
  });

  const form = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      province: '',
      city: '',
      address: '',
      post_code: '',
      password: '',
      confirm_password: '',
      agreement: false,
    },
  });

  const handleSubmit = (values: Yup.InferType<typeof formSchema>) => {
    mutateCreateUser({
      payload: {
        name: values.name,
        email: values.email,
        province: values.province,
        city: values.city,
        address: values.address,
        post_code: values.post_code,
        password: values.password,
        passwordConfirm: values.confirm_password,
        emailVisibility: false,
      },
    });
    showAlert({
      open: true,
      message: 'Registering...',
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
            <h2 className="text-2xl font-bold lg:text-3xl">Get started!</h2>
            <p className="leading-relaxed text-gray-500">
              Create your account now.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Controller
                control={form.control}
                name="name"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="text"
                    placeholder="Full Name"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
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
                name="province"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="text"
                    placeholder="Province"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="city"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="text"
                    placeholder="City"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="address"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="text"
                    placeholder="Address"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="post_code"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="text"
                    placeholder="Postal Code"
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
              <Controller
                control={form.control}
                name="confirm_password"
                render={(val) => (
                  <BaseInput
                    {...val.field}
                    type="password"
                    placeholder="Confirm Password"
                    error={val.fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Controller
              control={form.control}
              name="agreement"
              render={(val) => (
                <BaseCheckbox
                  className="mb-6"
                  value={val.field.value}
                  onChange={val.field.onChange}
                  error={val.fieldState.error?.message}
                  label={
                    <p>
                      By signing up you agree to our{' '}
                      <Link
                        href="/terms-and-conditions"
                        className="text-blue underline decoration-wavy"
                      >
                        terms & conditions
                      </Link>
                      , including the updates about SoKlin&apos;s event.
                    </p>
                  }
                />
              )}
            />
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue p-4 text-white transition duration-300 hover:bg-blue/90"
              >
                Create Account
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
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-blue underline decoration-wavy"
                >
                  Log in
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
