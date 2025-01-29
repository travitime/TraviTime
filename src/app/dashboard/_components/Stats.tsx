interface StatCard {
    title: string;
    value: number;
    period: string;
  }

  export const Stats = () => {
    const stats: StatCard[] = [
      { title: 'New Customers', value: 0, period: 'since last month' },
      // ... other stats
    ];
  
    return (
      <div className="grid grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <h3 className="text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold">-</p>
            <span className="text-sm text-gray-500">{stat.period}</span>
          </div>
        ))}
      </div>
    );
  };