
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import "./Home.css";



export default function Home() {



    const chartRef = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);






    useEffect(() => {
        const chart = new Chart(chartRef.current, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Seu saldo',
            data: [12, 19, 3, 5],

            borderColor: '#f7f7f7',
            pointBackgroundColor: '#f7f7f7',
            borderWidth: 2,
            borderDash: [1000, 1000],
            borderDashOffset: 1000

        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
            duration: 2000,
            easing: 'easeInOutCubic'
        },

        animations: {
            borderDashOffset: {
                from: 1000,
                to: 0,
                duration: 2000,
                easing: 'easeInOutCubic'
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }









        });



        const chart2 = new Chart(chartRef2.current, {
            type: 'pie',
            data: {
                labels: ['Maio', 'Junho'],
                datasets: [{
                    data: [60, 40],

                    backgroundColor: [
                        '#F8FAFC',
                        '#18181B'
                    ],

                    borderWidth: 0,
                    spacing: 0,

                    hoverOffset: 6,

                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: 'bottom',

                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 16,

                            color: '#71717A',

                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            }
                        }
                    },

                    tooltip: {
                        backgroundColor: '#18181B',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        padding: 12,

                        displayColors: true,

                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },

                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200,
                    easing: 'easeOutQuart'
                }
            }
        });


        const chart3 = new Chart(chartRef3.current, {
            type: 'bar',
            data: {
                labels: ['Abril', 'Maio', 'Junho',],
                datasets: [{
                    label: 'Valorização dos investimentos',
                    data: [500, 1025, 1130],

                    borderColor: '#f7f7f7',
                    backgroundColor: '#121213',
                    borderWidth: 2,


                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }








        });

        return () => {
            chart.destroy();
            chart2.destroy();
            chart3.destroy();
        };
    }, []);


    return (





        <div className="home">
            <Navbar />
            <main style={{ paddingTop: "74px" }}>


                <section className="home-section">
                    <div className="home-header">

                        <span className="home-badge">Dashboard - visão geral</span>

                    </div>

                    <div className="home-content">
                        <section className="grafico-principal">
                            <canvas ref={chartRef}></canvas>


                        </section>
                        <section className="grafico-secundario">
                            <div className="grafico-secundario-item">
                                <h2>Lucro no mês</h2>
                                <p>Quantidade de dinheiro guardado em realção ao mês anterior</p>

                                <div className="grafico-pizza">
                                    <canvas ref={chartRef2}></canvas>
                                </div>

                            </div>
                            <div className="grafico-secundario-item">
                                <h2>Investimentos</h2>

                                <div className="grafico-barras">
                                    <canvas ref={chartRef3}></canvas>
                                </div>

                            </div>

                            <div className="grafico-secundario-item">
                                <div className="meta-card">
                                    <h3>Meta Mensal</h3>

                                    <div className="meta-info">
                                        <span>R$ 1.200</span>
                                        <span>de R$ 2.000</span>
                                    </div>

                                    <div className="meta-progress">
                                        <div className="meta-progress-fill"></div>
                                    </div>

                                    <div className="meta-footer">
                                        <span>60% concluído</span>
                                        <span>Faltam R$ 800</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grafico-secundario-item">
                                <div className="contas-card">
                                    <h3>Próximas Contas</h3>

                                    <ul>
                                        <li>Internet <strong>R$ 99</strong></li>
                                        <li>Energia <strong>R$ 140</strong></li>
                                        <li>Netflix <strong>R$ 39</strong></li>
                                        <li>Spotify <strong>R$ 21</strong></li>
                                    </ul>
                                </div>
                            </div>


                        </section>
                    </div>
                </section>
            </main>
        </div>

    );
}