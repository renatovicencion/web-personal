import React, { useState, useEffect } from 'react';

import { Form, Input, Button, notification } from 'antd';
import { KeyOutlined, GiftOutlined, LinkOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { addCourseApi, updateCourseApi } from '../../../../api/course';

import "./AddEditCourseForm.scss";

const AddEditCourseForm = ({ setIsVisibleModal, setReloadCourses, course }) => {

    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
    }, [course])

    const addCourse = () => {
        
        if (!courseData.idCourse) {
            notification["error"]({
                message: "El id del curso es obligatorio."
            });
        } else {
            const accessToken = getAccessTokenApi();

            addCourseApi(accessToken, courseData)
                .then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";

                    notification[typeNotification]({
                        message: response.message
                    });
                    setIsVisibleModal(false);
                    setReloadCourses(true);
                    setCourseData({});
                })
                .catch(() => {
                    notification["error"]({
                        message: "Error del servidor, inténtelo más tarde."
                    });
                });
        }
    }
    
    const updateCourse = e => {

        const accessToken = getAccessTokenApi();

        updateCourseApi(accessToken, course._id, courseData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";

                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor, inténtelo más tarde."
                });
            });
    }

    return (
        <div className="add-edit-course-form">
            <AddEditForm 
                course={course}
                addCourse={addCourse}
                updateCourse={updateCourse}
                courseData={courseData}
                setCourseData={setCourseData}
            />
        </div>
    );
};

function AddEditForm({ course, addCourse, updateCourse, courseData, setCourseData }) {

    return (
        <Form className="form-add-edit" onFinish={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input
                    prefix={<KeyOutlined className="ico" />}
                    placeholder="ID del curso"
                    value={courseData.idCourse}
                    onChange={e => setCourseData({ ...courseData, idCourse: e.target.value })}
                    disabled={course ? true : false}
                >
                
                </Input>
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LinkOutlined className="ico" />}
                    placeholder="URL del Curso"
                    value={courseData.link}
                    onChange={e => setCourseData({ ...courseData, link: e.target.value })}
                >
                
                </Input>
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<GiftOutlined className="ico" />}
                    placeholder="Cupón de Descuento"
                    value={courseData.coupon}
                    onChange={e => setCourseData({ ...courseData, coupon: e.target.value })}
                >
                
                </Input>
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<DollarCircleOutlined className="ico" />}
                    placeholder="Precio del Curso"
                    value={courseData.price}
                    onChange={e => setCourseData({ ...courseData, price: e.target.value })}
                >
                
                </Input>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {course ? "Actualizar Curso" : "Crear Curso"}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddEditCourseForm;
