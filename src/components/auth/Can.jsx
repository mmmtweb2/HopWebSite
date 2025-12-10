import { useAuth } from '../../contexts/AuthContext';

/**
 * Can Component - RBAC Guard
 * Renders children only if user has the required permission(s)
 *
 * @param {string} perform - Single permission to check
 * @param {Array<string>} performAny - Check if user has ANY of these permissions
 * @param {Array<string>} performAll - Check if user has ALL of these permissions
 * @param {string} role - Check if user has this role
 * @param {ReactNode} children - Content to render if authorized
 * @param {ReactNode} fallback - Content to render if not authorized (optional)
 *
 * @example
 * <Can perform="edit_content">
 *   <button>Edit</button>
 * </Can>
 *
 * @example
 * <Can performAny={["edit_content", "manage_users"]}>
 *   <AdminPanel />
 * </Can>
 *
 * @example
 * <Can role="admin" fallback={<p>Admin only</p>}>
 *   <DangerZone />
 * </Can>
 */
const Can = ({
  perform,
  performAny,
  performAll,
  role,
  children,
  fallback = null
}) => {
  const { checkPermission, checkAnyPermission, checkAllPermissions, hasRole } = useAuth();

  let isAuthorized = false;

  // Check single permission
  if (perform) {
    isAuthorized = checkPermission(perform);
  }

  // Check if user has ANY of the permissions
  else if (performAny && Array.isArray(performAny)) {
    isAuthorized = checkAnyPermission(performAny);
  }

  // Check if user has ALL of the permissions
  else if (performAll && Array.isArray(performAll)) {
    isAuthorized = checkAllPermissions(performAll);
  }

  // Check role
  else if (role) {
    isAuthorized = hasRole(role);
  }

  // If no permission specified, don't show anything
  else {
    console.warn('Can component requires at least one of: perform, performAny, performAll, or role');
    return fallback;
  }

  return isAuthorized ? children : fallback;
};

export default Can;
