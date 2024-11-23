import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import { Thumbnail } from "@/components/Thumbnail";

const Dashboard = async () => {

    return (
        <div className='page-container-css'>
            <section className='w-full justify-start'>
                <h1 className='text-3xl font-bold'>{"Dashboard".toLocaleUpperCase()}</h1>
            </section>
        </div>
    );
};

export default Dashboard;