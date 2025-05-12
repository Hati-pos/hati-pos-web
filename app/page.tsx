'use client';

import React from 'react';
import { redirect } from 'next/navigation';

const Page = () => <div>{redirect('/stocks/home')}</div>;

export default Page;
