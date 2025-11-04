import React from 'react'

export default function StatCard({statIcon, stat, statPoints, StatIconStyle}: {statIcon: React.ReactNode, stat: string, statPoints: string, StatIconStyle?: string}) {
  return (
    <div className={`text-orange-400 bg-primary/20 backdrop-blur-md border-2 border-primary rounded-lg p-4 flex gap-2 items-center w-full flex-col ${StatIconStyle} text-center`}>
        {statIcon}
        <div className="content font-body font-normal text-text">
        <h1 className='text-xl font-semibold'>{stat}</h1>
        <span className='text-gray-300'>{statPoints}</span>
        </div>
    </div>
  )
}
