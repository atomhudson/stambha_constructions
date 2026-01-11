import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type Role = "admin" | "editor" | "viewer";

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);

                // If no specific roles required, authorization is true just by being logged in
                if (!allowedRoles || allowedRoles.length === 0) {
                    setIsAuthorized(true);
                    setLoading(false);
                    return;
                }

                // Check user role
                // We use the has_role database function for secure check
                const { data: hasRole, error } = await supabase.rpc('has_role', {
                    _role: 'admin',
                    _user_id: session.user.id
                });

                if (error) {
                    console.error("Error checking role:", error);
                    setIsAuthorized(false);
                } else {
                    // If we asked for admin and they have it (hasRole returns true/false)
                    // For simplicity in this demo, we assume if allowedRoles includes 'admin', we check for admin role
                    if (allowedRoles.includes('admin')) {
                        setIsAuthorized(!!hasRole);
                    } else {
                        // Fallback for other roles or generic check (implement specific checks if needed)
                        setIsAuthorized(false);
                    }
                }

            } catch (err) {
                console.error("Auth check failed:", err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to the secret login page, saving the location they were trying to access
        return <Navigate to="/admin-portal-login" state={{ from: location }} replace />;
    }

    if (!isAuthorized) {
        // If authenticated but not authorized (e.g. standard user trying to access admin)
        // For now, redirect to home or a dedicated unauthorized page
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
