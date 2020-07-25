import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HomeMyCoursesWork from '../components/Web/HomeMyCoursesWork';
import ReviewsCourses from '../components/Web/ReviewsCourses';

export default function Home() {
    return (
        <>
            <MainBanner></MainBanner>
            <HomeCourses></HomeCourses>
            <HomeMyCoursesWork></HomeMyCoursesWork>
            <ReviewsCourses></ReviewsCourses>
        </>
    );
}