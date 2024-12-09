/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import BaseAlertDialog from '@/components/Base/AlertDialog';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { useAlertDialog } from '@/hooks/use-alert-dialog';
import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';
import Yup from '@/lib/yup';
import { useChangePassword } from '@/services/userService';

interface IUser {
  address: string;
  avatar: string;
  avatarUrl: string;
  city: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  phone: string;
  post_code: string;
  province: string;
  referrer: any[];
  updated: string;
  username: string;
  verified: boolean;
}

const formSchema = Yup.object({
  old_password: Yup.string().required().min(8).label('Old Password'),
  new_password: Yup.string().required().min(8).label('New Password'),
  new_confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('new_password')], 'Password must match')
    .label('New Confirm Password'),
});

const Profile = () => {
  // load the previously stored provider's data
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const router = useRouter();
  const [user]: any = usePocketBaseAuth();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const { props: alertDialogProps, showAlert } = useAlertDialog();

  const form = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      old_password: '',
      new_password: '',
      new_confirm_password: '',
    },
  });

  const { mutate: mutateChangePassword } = useChangePassword({
    onSuccess() {
      showAlert({
        open: true,
        message: 'Password changed!',
        loading: false,
        type: 'success',
        onClose: () => {
          router.push('/profile');
        },
      });
    },
    onError() {
      showAlert({
        open: true,
        message: 'Failed to change password!',
        loading: false,
        type: 'error',
      });
    },
  });

  const handleSubmitChangePassword = (
    values: Yup.InferType<typeof formSchema>
  ) => {
    mutateChangePassword({
      id: (user as any).model.id,
      payload: {
        oldPassword: values.old_password,
        password: values.new_password,
        passwordConfirm: values.new_confirm_password,
      },
    });
    showAlert({
      open: true,
      message: 'Changing password...',
      loading: true,
      type: 'default',
    });
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (user === null && typeof window !== 'undefined') {
      router.push('/register');
    }

    if (user !== null && typeof window !== 'undefined') {
      pb.collection('users')
        .getOne((user as any).model.id as string)
        .then((res: any) => {
          setUserData(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const referrers = [];
    const checkboxes = document.querySelectorAll(
      'input[type=checkbox]:checked'
    );

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < checkboxes.length; i++) {
      referrers.push((checkboxes[i] as any).value);
    }

    // console.log(referrers);

    console.log(e.target);

    const target = e.target as typeof e.target & {
      surel: { value: string };
      name: { value: string };
      phone: { value: string };
      province: { value: string };
      city: { value: string };
      address: { value: string };
      post_code: { value: string };
    };

    const data = {
      email: target.surel.value,
      name: target.name.value,
      phone: target.phone.value,
      province: target.province.value,
      city: target.city.value,
      address: target.address.value,
      post_code: target.post_code.value,
      referrer: referrers,
    };

    console.log(data);

    try {
      const record = await pb
        .collection('users')
        .update((user as any).model.id as string, data);
      if (record) {
        setIsSent(true);
        pb.collection('users')
          .getOne((user as any).model.id as string)
          .then((res: any) => {
            setUserData(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    } catch {
      // ignore catch
    }

    // console.log(data);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('avatar', fileInput.files[0]);
    }

    try {
      const record = await pb
        .collection('users')
        .update((user as any).model.id as string, formData);
      setUserData(record as any);
    } catch {
      // ignore catch
    }
  };

  const logout = useCallback(() => {
    pb.authStore.clear();
    window.location.href = '/';
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const isInComplete = (userData: IUser) => {
    if (
      userData.email === '' ||
      userData.address === '' ||
      userData.city === '' ||
      userData?.phone === '' ||
      userData.post_code === '' ||
      userData.province === '' ||
      userData.referrer.length === 0
    ) {
      return 'Incomplete';
    }

    return 'Completed';
  };

  const avatar = useMemo(() => {
    if (userData) {
      if (userData.avatar) {
        return `${process.env.NEXT_PUBLIC_API_URL}/files/${userData.collectionId}/${userData.id}/${userData.avatar}?thumb=80x80`;
      }
      if (userData?.avatarUrl) {
        return userData.avatarUrl;
      }
    }
    return '/assets/images/avatar-placeholder.png';
  }, [userData]);

  return (
    <>
      <Head>
        <title>Profile</title>

        <style>{`
          body {
            background: #EEF3F6
          }
        `}</style>
      </Head>
      <Container className="px-4 py-10 md:px-0 md:py-20">
        <BaseAlertDialog {...alertDialogProps} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {/* Menu */}
          <div className="md:col-span-1">
            <div className="flex md:block">
              <button className="mb-2 block w-full rounded-full bg-sky-300 px-10 py-3 text-center hover:bg-blue-100 hover:text-white md:text-left">
                Account
              </button>
              <button
                onClick={logout}
                className="block w-full rounded-full px-10 py-3 text-center hover:bg-blue-100 hover:text-white md:text-left"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile */}
          <div className="md:col-span-3">
            {domLoaded && user !== null && userData && (
              <form
                onSubmit={handleSubmit}
                className="block rounded-xl bg-white p-10"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl">Account</h1>

                  <div>
                    <div
                      className={`rounded-md ${
                        isInComplete(userData) === 'Incomplete'
                          ? 'bg-orange-300'
                          : 'bg-green-600'
                      } px-2 text-white`}
                    >
                      {isInComplete(userData)}
                    </div>
                  </div>
                </div>

                <h2 className="mt-8 text-xl">Avatar</h2>

                <div className="avatar mt-3 flex items-center gap-4">
                  {/* Umage */}
                  <div>
                    <img
                      src={avatar}
                      width={60}
                      height={50}
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="file"
                      className="labelnomargin"
                      style={{ margin: '0!important' }}
                    >
                      <Button variant="outlined">Upload</Button>
                    </label>
                  </div>
                  <div>
                    <Button variant="outlined">Remove</Button>
                  </div>
                </div>

                <input
                  type="file"
                  id="file"
                  // value={form.attachment}
                  style={{ width: 0, height: 0, opacity: 0 }}
                  onChange={(e: any) => {
                    handleUpload();
                    console.log(e.target.value);
                  }}
                />

                <h2 className="mt-8 text-xl">Personal Contact</h2>

                <div className="mt-4 flex flex-col gap-6">
                  {/* Name */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-2">
                      <label>Full Name</label>

                      <input
                        type="text"
                        name="name"
                        defaultValue={userData.name}
                      />
                    </div>
                  </div>

                  {/* Email | Phone */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label>Email</label>

                      <input
                        type="text"
                        name="surel"
                        disabled={userData.email !== ''}
                        className="disabled:bg-gray-500"
                        defaultValue={userData.email}
                      />
                    </div>

                    <div>
                      <label>Phone Number</label>

                      <input
                        type="text"
                        name="phone"
                        pattern="[0-9]{1,13}"
                        defaultValue={userData.phone}
                      />
                    </div>
                  </div>

                  <h2 className="mt-8 text-xl">Location</h2>

                  {/* Location | City */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label>Province</label>

                      <input
                        type="text"
                        name="province"
                        className="disabled:bg-gray-500"
                        defaultValue={userData.province}
                      />
                    </div>

                    <div>
                      <label>City</label>

                      <input
                        type="text"
                        name="city"
                        defaultValue={userData.city}
                      />
                    </div>
                  </div>

                  {/* Address | Post Code */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label>Address</label>

                      <textarea
                        name="address"
                        className="disabled:bg-gray-500"
                        defaultValue={userData.address}
                      ></textarea>
                    </div>

                    <div>
                      <label>Postal Code</label>

                      <input
                        type="text"
                        name="post_code"
                        defaultValue={userData.post_code}
                      />
                    </div>
                  </div>

                  {/* Referrer */}
                  <div className="mt-3 grid grid-cols-1 gap-4">
                    <div>
                      <h2 className=" text-xl">
                        How did you know about us?{' '}
                        <span className="text-red-600">*</span>
                      </h2>

                      <div className="gap-4 md:flex">
                        {[
                          'social media',
                          'tv',
                          'newspaper',
                          'friends',
                          'email',
                        ].map((referrer) => (
                          <div
                            key={`ref-${referrer}`}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              name="referrer"
                              value={referrer}
                              defaultChecked={userData.referrer.includes(
                                referrer as string
                              )}
                              id={referrer.replace(' ', '-')}
                              className="border-2 border-solid border-blue-100"
                            />{' '}
                            <label
                              htmlFor={referrer.replace(' ', '-')}
                              style={{ marginBottom: '0!important' }}
                              className="mb-0 mt-2 capitalize"
                            >
                              {referrer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="elevated  text-md flex items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
                    style={{ padding: '15px 25px', marginTop: 20 }}
                  >
                    Save Changes
                  </button>
                </div>
                {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
              </form>
            )}

            <form
              onSubmit={form.handleSubmit(handleSubmitChangePassword)}
              className="mt-10 block rounded-xl bg-white p-10"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">Change Password</h1>
              </div>

              <div className="mt-4 flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-2">
                    <label>Old Password</label>

                    <Controller
                      control={form.control}
                      name="old_password"
                      render={(val) => (
                        <>
                          <input
                            {...val.field}
                            type="password"
                            placeholder="Old Password"
                          />
                          {val.fieldState.error?.message && (
                            <p className="text-red-500">
                              {val.fieldState.error?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-2">
                    <label>New Password</label>

                    <Controller
                      control={form.control}
                      name="new_password"
                      render={(val) => (
                        <>
                          <input
                            {...val.field}
                            type="password"
                            placeholder="New Password"
                          />
                          {val.fieldState.error?.message && (
                            <p className="text-red-500">
                              {val.fieldState.error?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-2">
                    <label>New Confirm Password</label>

                    <Controller
                      control={form.control}
                      name="new_confirm_password"
                      render={(val) => (
                        <>
                          <input
                            {...val.field}
                            type="password"
                            placeholder="New Confirm Password"
                          />
                          {val.fieldState.error?.message && (
                            <p className="text-red-500">
                              {val.fieldState.error?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="elevated  text-md flex items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
                  style={{ padding: '15px 25px', marginTop: 20 }}
                >
                  Save Changes
                </button>
              </div>
              {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
            </form>
          </div>
        </div>
      </Container>

      {isSent && (
        <>
          <div
            onClick={() => {
              setIsSent(false);
            }}
            className="modal-overlay"
          ></div>
          <div className="modal-box rounded-md bg-white px-7 py-6 pb-10 text-center">
            <div className="text-right">
              <button
                onClick={() => {
                  setIsSent(false);
                }}
              >
                <img
                  src="/assets/images/close__1.svg"
                  alt="close"
                  loading="lazy"
                />
              </button>
            </div>

            <div className="mb-8 mt-5 text-center">
              <img
                src="/assets/images/amico.svg"
                style={{ display: 'inline-block' }}
                alt=""
              />

              <div className="mt-4 text-2xl font-black">
                Data Successfully Saved!
              </div>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        input[type='text'],
        input[type='email'],
        input[type='password'],
        input[type='number'],
        textarea {
          background: #ffffff;
          border: 0.5px solid #aaaaaa;
          border-radius: 5px;
          display: block;
          width: 100%;
          padding: 15px 15px;
        }

        input:disabled {
          background: #e0e0e0;
        }

        label:not(.labelnomargin) {
          display: block;
          margin-bottom: 7px;
          font-size: 16px;
        }
        .modal-box {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 400px;
          margin: 0 auto;
          left: 0;
          right: 0;
          background: #fff;
          z-index: 99999;
        }
        .modal-overlay {
          position: fixed;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
        }
      `}</style>
    </>
  );
};

export default Profile;
