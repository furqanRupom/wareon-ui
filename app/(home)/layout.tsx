import Footer from '@/components/footer/Footer';
import Navbar from '@/components/shared/Navbar';
import * as React from 'react';

interface IHomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = (props) => {
    return <main>
        <Navbar />
        <div>
            {props.children}
        </div>
        <Footer />
    </main>;
};

export default HomeLayout;