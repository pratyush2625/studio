'use client';

import {
  PolarGrid,
  Radar,
  RadarChart,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { userSkills } from '../../lib/data';

const chartConfig = {
  level: {
    label: 'Skill Level',
    color: 'hsl(var(--primary))',
  },
};

export function SkillGraph() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto w-full">
      <ResponsiveContainer>
        <RadarChart data={userSkills} margin={{ top: 10, right: 30, bottom: 0, left: 30 }}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
