import React, { useState, useEffect } from 'react';

import { Row, Col, Card, Button, Rate, notification } from 'antd';
import { getCourseDataUdemyApi } from '../../../../api/course';

import "./CoursesList.scss";

const CoursesList = ({ courses }) => {

    return (
        <div className="courses-list">
            <Row>
                { 
                    courses.map(course => (
                        <Col key={course._id} md={8} className="courses-list__course">
                            <Course course={course} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

function Course({ course }) {

    const [courseInfo, setCourseInfo] = useState({});
    const [urlCourse, setUrlCourse] = useState("");

    const { Meta } = Card;

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setCourseInfo(response.data);
                    mountUrl(response.data.url);
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor, inténtelo más tarde."
                });
            })
    }, [course]);

    const mountUrl = url => {
        if (!course.link) {
            const baseURL = `https://www.udemy.com${url}`;
            const finalURL = baseURL + (course.coupon ? `?couponCode=${course.coupon}` : "" );

            setUrlCourse(finalURL);
        } else {
            setUrlCourse(course.link);
        }
    }

    return (
        <a href={urlCourse} target="_blank" rel="noopener noreferrer">
            <Card 
                cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} /> }
            >
                <Meta 
                    title={courseInfo.title} 
                    description={courseInfo.headline}
                />

                <Button>Entrar en el Curso</Button>

                <div className="courses-list__course-footer">
                    <span className="span">{course.price ? `${course.price} US$` : `${courseInfo.price}`}</span>

                    <div>
                        <Rate disabled defaultValue={5} />
                    </div>
                </div>
            </Card>
        </a>
    );
}

export default CoursesList;
