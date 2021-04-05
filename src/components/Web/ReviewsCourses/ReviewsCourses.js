import React from 'react';

import  { Row, Col, Card, Avatar } from 'antd';
import avatarPersona from "../../../assets/img/png/avatar-persona.png";

import './ReviewsCourses.scss';

const ReviewsCourses = () => {
    return (
        <Row className="reviews-courses">
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title">
                    <h2>Forma parte de los +35 mil estudiantes que están aprendiendo con mis cursos.</h2>
                </Col>
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Renato VN"
                                subtitle="Alumno de Udemy"
                                avatar={avatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
                            />
                        </Col>

                        <Col md={8}>
                            <CardReview 
                                name="Lucía Morá"
                                subtitle="Alumna de Udemy"
                                avatar={avatarPersona}
                                review="Si te gustan los cursos que profundizan en la materia, te lo recomiendo. El profesor explica de forma completa todos los conceptos necesarios para trabajar con grid. Un gran curso."
                            />
                        </Col>

                        <Col md={8}>
                            <CardReview 
                                name="Carla VN"
                                subtitle="Alumna de Udemy"
                                avatar={avatarPersona}
                                review="El contenido del curso es muy completo y de necesitar cualquier dato adicional el profesor está super pendiente para responder. Ya tengo creado mi E-commerce con WordPress y gran parte de la información necesaria la obtuve del curso."
                            />
                        </Col>
                    </Row>

                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Renato VN"
                                subtitle="Alumno de Udemy"
                                avatar={avatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
                            />
                        </Col>

                        <Col md={8}>
                            <CardReview 
                                name="Lucía Morá"
                                subtitle="Alumna de Udemy"
                                avatar={avatarPersona}
                                review="Si te gustan los cursos que profundizan en la materia, te lo recomiendo. El profesor explica de forma completa todos los conceptos necesarios para trabajar con grid. Un gran curso."
                            />
                        </Col>

                        <Col md={8}>
                            <CardReview 
                                name="Carla VN"
                                subtitle="Alumna de Udemy"
                                avatar={avatarPersona}
                                review="El contenido del curso es muy completo y de necesitar cualquier dato adicional el profesor está super pendiente para responder. Ya tengo creado mi E-commerce con WordPress y gran parte de la información necesaria la obtuve del curso."
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    );
};

function CardReview({ name, subtitle, avatar, review}) {
    
    const { Meta } = Card;

    return (
        <Card className="reviews-courses__card">
            <p>{review}</p>
            <Meta 
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    );
}

export default ReviewsCourses;
