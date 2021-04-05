import React, { Fragment } from 'react';

import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HowMyCoursesWork from '../components/Web/HowMyCoursesWork';
import ReviewsCourses from '../components/Web/ReviewsCourses';

const Home = () => {
    return (
        <Fragment>
            <MainBanner />
            <HomeCourses />
            <HowMyCoursesWork />
            <ReviewsCourses />
        </Fragment>
    );
};

export default Home;
