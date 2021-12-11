import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import peopleOutline from '@iconify/icons-eva/people-outline';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Clientes',
    path: '/dashboard/client',
    icon: getIcon(peopleOutline)
  },
  {
    title: 'Productos',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Obras',
    path: '/dashboard/obras',
    icon: getIcon(settings2Fill)
  }
];

export default sidebarConfig;
