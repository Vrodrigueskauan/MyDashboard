
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
import { Plus } from "lucide-react";
import Navbar from '../../components/Navbar';
import "./Invest.css";



export default function Investimentos() {



    const chartRef4 = useRef(null);
    const chartRef5 = useRef(null);
    const chartRef6 = useRef(null);






    useEffect(() => {
        const chart = new Chart(chartRef4.current, {
            type: 'bar',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [{
                    label: 'Seu saldo',
                    data: [12, 19, 23, 35],
                    backgroundColor: '#121213',
                    borderColor: '#f7f7f7',
                    borderWidth: 2,
                    borderRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart',
                    delay: (ctx) => ctx.dataIndex * 200
                },

                animations: {
                    y: {
                        from: 500
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const chart2 = new Chart(chartRef5.current, {
            type: 'line',
            data: {
                labels: [
                    'Semana 1 (04–10 Mai)',
                    'Semana 2 (11–17 Mai)',
                    'Semana 3 (18–24 Mai)',
                    'Semana 4 (25 Mai–04 Jun)'
                ],
                datasets: [{
                    label: 'Bitcoin',
                    data: [78562, 80850, 77500, 73300],
                    backgroundColor: '#121213',
                    borderColor: '#f7f7f7',
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
                        beginAtZero: false
                    }
                }
            }
        });

        const chart3 = new Chart(chartRef6.current, {
    type: 'line',
    data: {
        labels: [
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex'
        ],
        datasets: [{
            label: 'NVIDIA (NVDA)',
            data: [138, 142, 147, 151, 158],
            borderColor: '#f7f7f7',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderDash: [1000, 1000],
            borderDashOffset: 1000,
            fill: false
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

        return () => {
            chart.destroy();
            chart2.destroy();
            chart3.destroy();
        };
    }, []);

    return (





        <div className="invest">
            <Navbar />
            <main style={{ paddingTop: "74px" }}>


                <section className="invest-section">
                    <div className="invest-header">

                        <span className="invest-badge">Dashboard - Investimentos</span>

                    </div>

                    <div className="invest-main-content">
                        <section className="grafico-invest">
                            <canvas ref={chartRef4}></canvas>
                        </section>
                        <section className='grafico-invest' id='add'>
                            <Plus size={150} color='#f7f7f7' />
                        </section>
                    </div>

                    <div className="invest-second-content">
                        <section className="grafico-invest-second">
                            <div className='title'>

                                <h3>Investimento</h3>

                                <h3>Bitcoin</h3>
                            </div>
                            <div className='subgrafico'>
                                <canvas ref={chartRef5}></canvas>
                            </div>
                        </section>
                        <section className='grafico-invest-second'>
                            <div className='title'>

                                <h3>Maior valorização da semana</h3>

                                <h3>NVIDIA (NVDA)</h3>
                            </div>
                            <div className='subgrafico'>
                                <canvas ref={chartRef6}></canvas>
                            </div>
                            
                        </section>
                    </div>


                </section>


            </main>
        </div >


    );
}