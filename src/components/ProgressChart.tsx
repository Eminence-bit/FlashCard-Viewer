import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ProgressStats } from '../types';
import { useTheme } from '../hooks/useTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressChartProps {
  stats: ProgressStats;
}

export function ProgressChart({ stats }: ProgressChartProps) {
  const { isDark } = useTheme();

  const data = {
    labels: ['Known', 'Learning', 'Not Started'],
    datasets: [
      {
        data: [stats.known, stats.unknown, stats.remaining],
        backgroundColor: [
          'rgb(16, 185, 129, 0.9)', // emerald-500 with opacity
          'rgb(244, 63, 94, 0.9)',  // rose-500 with opacity
          isDark ? 'rgb(55, 65, 81, 0.9)' : 'rgb(209, 213, 219, 0.9)' // gray-700 : gray-300 with opacity
        ],
        borderColor: [
          'rgb(5, 150, 105)',  // emerald-600
          'rgb(225, 29, 72)',  // rose-600
          isDark ? 'rgb(75, 85, 99)' : 'rgb(156, 163, 175)' // gray-600 : gray-400
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgb(16, 185, 129)', // emerald-500 full opacity
          'rgb(244, 63, 94)',  // rose-500 full opacity
          isDark ? 'rgb(55, 65, 81)' : 'rgb(209, 213, 219)' // gray-700 : gray-300 full opacity
        ],
        hoverBorderColor: [
          'rgb(4, 120, 87)',  // emerald-700
          'rgb(190, 18, 60)', // rose-700
          isDark ? 'rgb(31, 41, 55)' : 'rgb(107, 114, 128)' // gray-800 : gray-500
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: isDark ? '#e5e7eb' : '#1f2937', // gray-200 : gray-800
          font: {
            family: 'Inter',
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgb(31, 41, 55, 0.95)' : 'rgb(255, 255, 255, 0.95)',
        titleColor: isDark ? '#e5e7eb' : '#1f2937',
        bodyColor: isDark ? '#e5e7eb' : '#1f2937',
        bodyFont: {
          family: 'Inter',
          size: 12,
        },
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: '600',
        },
        padding: 12,
        boxPadding: 6,
        borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / stats.total) * 100);
            return `${label}: ${value} cards (${percentage}%)`;
          },
          title: function() {
            return 'Learning Progress';
          }
        }
      }
    },
    elements: {
      arc: {
        borderRadius: 6,
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className="w-full h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
}