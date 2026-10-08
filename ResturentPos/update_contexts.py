import sys
import re

# Fix DashboardLayout.jsx
dashboard_filepath = r'e:\Saylani_Internship\ResturentPos\src\components\layout\DashboardLayout.jsx'
with open(dashboard_filepath, 'r', encoding='utf-8') as f:
    dashboard_content = f.read()

dashboard_content = dashboard_content.replace("import { Outlet } from 'react-router-dom';", "import { Outlet, useLocation } from 'react-router-dom';")

dashboard_is_single_replacement = """  const location = useLocation();
  const isWaiterContext = currentUser?.role === 'waiter' || location.pathname.startsWith('/waiter');
  const isReceptionContext = currentUser?.role === 'receptionist' || location.pathname.startsWith('/reception');
  const isSingleSidebar = isWaiterContext || isReceptionContext;"""
dashboard_content = re.sub(r'  const isSingleSidebar = currentUser\?\.role === \'receptionist\' \|\| currentUser\?\.role === \'waiter\';', dashboard_is_single_replacement, dashboard_content)

with open(dashboard_filepath, 'w', encoding='utf-8') as f:
    f.write(dashboard_content)

# Fix Sidebar.jsx
sidebar_filepath = r'e:\Saylani_Internship\ResturentPos\src\components\layout\Sidebar.jsx'
with open(sidebar_filepath, 'r', encoding='utf-8') as f:
    sidebar_content = f.read()

sidebar_state_replacement = """  const isWaiterContext = currentUser?.role === 'waiter' || location.pathname.startsWith('/waiter');
  const isReceptionContext = currentUser?.role === 'receptionist' || location.pathname.startsWith('/reception');

  const [activePrimary, setActivePrimary] = useState(() => {
    if (isReceptionContext) return 'reception-dashboard';
    if (isWaiterContext) return 'waiter';
    return 'finance';
  });
  const visibleMenus = isReceptionContext ? receptionistMenuStructure : 
                       isWaiterContext ? waiterMenuStructure : 
                       menuStructure;"""
                       
sidebar_content = re.sub(
    r'  const \[activePrimary.*?menuStructure;',
    sidebar_state_replacement,
    sidebar_content,
    flags=re.DOTALL
)

sidebar_effect_replacement = """  useEffect(() => {
    if (isReceptionContext) {
      setActivePrimary(receptionistMenuStructure.find(item => location.pathname === item.path)?.id || 'reception-dashboard');
      return;
    }
    if (isWaiterContext) {
      setActivePrimary(waiterMenuStructure.find(item => location.pathname === item.path)?.id || 'waiter');
      return;
    }"""
    
sidebar_content = re.sub(
    r'  useEffect\(\(\) => \{\n    if \(currentUser\?\.role === \'receptionist\'\).*?return;\n    \}',
    sidebar_effect_replacement,
    sidebar_content,
    flags=re.DOTALL
)

sidebar_content = sidebar_content.replace("const isSingleSidebar = currentUser?.role === 'receptionist' || currentUser?.role === 'waiter';", "const isSingleSidebar = isReceptionContext || isWaiterContext;")

with open(sidebar_filepath, 'w', encoding='utf-8') as f:
    f.write(sidebar_content)

print('Context updates applied successfully.')
