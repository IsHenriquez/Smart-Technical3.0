export default [
  {
    title: 'Apps',
    icon: { icon: 'tabler-layout-grid-add' },
    children: [
      {
        title: 'Tickets',
        icon: { icon: 'tabler-mail' },
        to: 'apps-ticket',
      },
      {
        title: 'Mapa',
        icon: { icon: 'tabler-message-circle' },
        to: 'apps-chat',
      },
      {
        title: 'Calendario',
        to: 'apps-calendar',
        icon: { icon: 'tabler-calendar' },
      },
      
      {
        title: 'Usuarios',
        icon: { icon: 'tabler-users' },
        to: 'apps-user-list',    
      },
      {
        title: 'Vehículos',
        icon: { icon: 'tabler-settings' },
        to: 'apps-roles',
      },
    ],
  },
]
