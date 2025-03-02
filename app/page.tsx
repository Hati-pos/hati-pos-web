import React from 'react';
import { redirect } from 'next/navigation';

const Page = () => <div>{redirect('/stocks/all-product')}</div>;

export default Page;
