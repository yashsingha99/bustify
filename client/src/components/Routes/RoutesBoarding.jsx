import React from 'react';
import { ChevronDown } from 'lucide-react';

const RoutesBoarding = ({ primaryColor = '#ff5733', secondaryColor = '#ffa07a' }) => {
  const scheduleData = [
    {
      name: 'GLA main gate',
      description: 'First Stop',
      forenoon: '05:15am',
      afternoon: '10:10am',
    },
    {
      name: 'Vrindavan chauraha(Chhatikra)',
      description: 'Second Stop',
      forenoon: '05:30am',
      afternoon: '10:30am',
    },
    {
      name: 'Goverdhan chauraha',
      description: 'Third Stop',
      forenoon: '05:40am',
      afternoon: '10:40am',
    },
    {
      name: 'Exam centre',
      description: 'Final Destination',
      forenoon: '9:05am',
      afternoon: '02:05pm',
      isFinal: true,
    },
  ];

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: primaryColor }}>
        Boarding Points & Schedule
      </h1>
      <div className="space-y-6">
        {scheduleData.map((stop) => (
          <React.Fragment key={stop.name}>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold" style={{ color: primaryColor }}>{stop.name}</h2>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: secondaryColor, color: 'white' }}>
                  {stop.description}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-medium">Forenoon</p>
                  <p className="text-lg">{stop.forenoon}</p>
                </div>
                <div>
                  <p className="font-medium">Afternoon</p>
                  <p className="text-lg">{stop.afternoon}</p>
                </div>
              </div>
            </div>
            {!stop.isFinal && (
              <div className="flex justify-center">
                <ChevronDown className="w-8 h-8 animate-bounce" style={{ color: primaryColor }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RoutesBoarding;
