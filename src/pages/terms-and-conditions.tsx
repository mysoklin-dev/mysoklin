import { List } from 'iconoir-react';
import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12 lg:py-16 xl:px-0">
      <h1 className="mb-3 text-5xl font-bold">Privacy Policy</h1>
      <span className="mb-4 text-base text-gray-500">
        Last updated: 1 December 2024
      </span>
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        <div className="order-2 col-span-12 md:order-1 md:col-span-8">
          <h2 className="mb-10 mt-0 text-4xl md:mt-10">
            This Privacy Policy will help you better understand how we collect,
            use, and share your personal information.
          </h2>
          <h3 className="mb-4 text-2xl font-bold">
            1. SoKlin approach to privacy
          </h3>
          <p className="mb-10 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3 className="mb-4 text-2xl font-bold">
            2. Our role in relation to your personal information
          </h3>
          <p className="mb-10 text-base">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p className="mb-10 text-base">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
            enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur
          </p>
          <h3 className="mb-4 text-2xl font-bold">
            2. Our role in relation to your personal information
          </h3>
          <p className="mb-10 text-base">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p className="mb-10 text-base">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
            enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur
          </p>
          <h3 className="mb-4 text-2xl font-bold">
            3. Personal information we collect about you and how we use it
          </h3>
          <p className="mb-10 text-base">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <h3 className="mb-4 text-2xl font-bold">
            4. Cookies and similar technologies
          </h3>
          <p className="mb-10 text-base">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p className="mb-10 text-base">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
            enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur
          </p>
        </div>
        <div className="relative order-1 col-span-12 md:order-2 md:col-span-4">
          <div className="mt-10 md:mt-0">
            <div className="mb-4 flex items-center gap-2 text-blue">
              <List width={24} height={24} />
              <h6 className="text-base font-bold">Table of contents</h6>
            </div>
            <ol type="1" className="list-inside list-decimal space-y-3">
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  SoKlin approach to privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Our role in relation to your personal information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Personal information we collect about you and how we use it
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Cookies and similar technologies
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Information we share with third parties
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Marketing and advertising
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Storing and protecting your personal information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Your rights in respect of your personal information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Location of your personal information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Notice on EU-US Data Privacy Framework and UK Extension
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Links to third party sites
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Changes to this policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-bold text-black">
                  Contacting us
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
