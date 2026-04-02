import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import * as React from 'react';

interface IHomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = (props) => {
    return <main className="max-w-7xl mx-auto">
        <Navbar />
        <div>
            {props.children}
        </div>
        <Footer />
    </main>;
};

export default HomeLayout;