import React from 'react';
import { ScreenId, Consultation } from '../../types';
import { UnifiedTabs } from './UnifiedTabs';

interface TabsProps {
  activeTab: 'Consultas' | 'Actividades';
  onNavigate: (screen: ScreenId) => void;
  consultas?: Consultation[];
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onNavigate, consultas = [] }) => {
  const unreadCount = consultas.filter(c => !c.respondida).length;

  return (
    <UnifiedTabs 
      activeTabId={activeTab === 'Actividades' ? 'actividades' : 'consultas'}
      tabs={[
        {
          id: 'actividades',
          label: 'Actividades',
          icon: 'event_note',
          onClick: () => onNavigate('S20e')
        },
        {
          id: 'consultas',
          label: 'Consultas de clase',
          icon: 'forum',
          badge: unreadCount,
          color: '#6200ee',
          onClick: () => onNavigate('S20d')
        }
      ]}
    />
  );
};
