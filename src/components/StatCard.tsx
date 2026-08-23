import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>

        <h3>{value}</h3>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default StatCard;