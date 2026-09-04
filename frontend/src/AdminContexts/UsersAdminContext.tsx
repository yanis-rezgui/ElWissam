
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type { User } from "../Types/Types";
import { useAuthContext } from "../Contexts/AuthContext";


// =========================================================
// TYPES
// =========================================================

interface UsersPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface UsersAdminContextType {

    // =========================
    // USERS
    // =========================

    allUsers: User[];
    loadingAllUsers: boolean;

    getAllUsers: () => Promise<void>;


    // =========================
    // FILTERS
    // =========================

    search: string;
    setSearch: (s: string) => void;

    role: string | undefined;
    setRole: (r: string | undefined) => void;


    // =========================
    // PAGINATION
    // =========================

    currentPage: number;
    setCurrentPage: (page: number) => void;

    pageLimit: number;
    setPageLimit: (limit: number) => void;

    pagination: UsersPagination | null;


    // =========================
    // UPDATE USER
    // =========================

    updateUser: (
        id: string,
        firstName: string,
        lastName: string,
        role: string
    ) => Promise<boolean>;

    loadingUpdateUser: boolean;


    // =========================
    // ADD USER
    // =========================

    addUser: (
        firstName: string,
        lastName: string,
        email: string,
        password1: string,
        password2: string,
        role: string
    ) => Promise<boolean>;

    loadingAddUser: boolean;


    // =========================
    // DELETE USER
    // =========================

    deleteUser: (id: string) => Promise<boolean>;

    loadingDeleteUser: boolean;


    // =========================
    // POPUPS
    // =========================

    showAddUserPop: boolean;
    setShowAddUserPop: (b: boolean) => void;

    showUpdateUserPop: boolean;
    setShowUpdateUserPop: (b: boolean) => void;

    showDeleteUserPop: boolean;
    setShowDeleteUserPop: (b: boolean) => void;


    // =========================
    // USER DETAILS
    // =========================

    userDetails: User | null;
    setUserDetails: (u: User | null) => void;


    // =========================
    // MESSAGE
    // =========================

    msg: string | null;
}


// =========================================================
// CONTEXT
// =========================================================

const UsersAdminContext =
    createContext<UsersAdminContextType | null>(null);


// =========================================================
// PROVIDER
// =========================================================

export const UsersAdminProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const { token } = useAuthContext();


    // =====================================================
    // USERS
    // =====================================================

    const [allUsers, setAllUsers] =
        useState<User[]>([]);

    const [loadingAllUsers, setLoadingAllUsers] =
        useState<boolean>(false);


    // =====================================================
    // MESSAGE
    // =====================================================

    const [msg, setMsg] =
        useState<string | null>(null);


    // =====================================================
    // FILTERS
    // =====================================================

    const [search, setSearch] =
        useState<string>("");

    const [role, setRole] =
        useState<string | undefined>(undefined);


    // =====================================================
    // PAGINATION
    // =====================================================

    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [pageLimit, setPageLimit] =
        useState<number>(10);

    const [pagination, setPagination] =
        useState<UsersPagination | null>(null);


    // =====================================================
    // UPDATE
    // =====================================================

    const [loadingUpdateUser, setLoadingUpdateUser] =
        useState<boolean>(false);


    // =====================================================
    // ADD
    // =====================================================

    const [loadingAddUser, setLoadingAddUser] =
        useState<boolean>(false);


    // =====================================================
    // DELETE
    // =====================================================

    const [loadingDeleteUser, setLoadingDeleteUser] =
        useState<boolean>(false);


    // =====================================================
    // USER DETAILS
    // =====================================================

    const [userDetails, setUserDetails] =
        useState<User | null>(null);


    // =====================================================
    // POPUPS
    // =====================================================

    const [showAddUserPop, setShowAddUserPop] =
        useState<boolean>(false);

    const [showUpdateUserPop, setShowUpdateUserPop] =
        useState<boolean>(false);

    const [showDeleteUserPop, setShowDeleteUserPop] =
        useState<boolean>(false);


    // =====================================================
    // GET ALL USERS
    // =====================================================

    const getAllUsers = async () => {

        try {

            setLoadingAllUsers(true);
            setMsg(null);

            const params = new URLSearchParams();

            params.append(
                "page",
                String(currentPage)
            );

            params.append(
                "limit",
                String(pageLimit)
            );


            if (search && search.trim() !== "") {

                params.append(
                    "search",
                    search.trim()
                );
            }


            if (role && role.trim() !== "") {

                params.append(
                    "role",
                    role.trim()
                );
            }


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users?${params.toString()}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la récupération des utilisateurs"
                );

                throw new Error(
                    data.error ||
                    data.message ||
                    "Error in getting users"
                );
            }


            console.log("All users: ", data.data);
            setAllUsers(data.data);


            setPagination(
                data.pagination
            );


        } catch (err) {

            console.error(err);

        } finally {

            setLoadingAllUsers(false);
        }
    };


    // =====================================================
    // UPDATE USER
    // =====================================================

    const updateUser = async (
        id: string,
        firstName: string,
        lastName: string,
        role: string
    ): Promise<boolean> => {

        try {

            setLoadingUpdateUser(true);
            setMsg(null);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        firstName,
                        lastName,
                        role
                    })
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la modification de l'utilisateur"
                );

                return false;
            }


            await getAllUsers();

            setShowUpdateUserPop(false);

            setUserDetails(null);

            return true;


        } catch (err) {

            console.error(err);

            setMsg(
                "Erreur réseau, veuillez réessayer"
            );

            return false;

        } finally {

            setLoadingUpdateUser(false);
        }
    };


    // =====================================================
    // ADD USER
    // =====================================================

    const addUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password1: string,
        password2: string,
        role: string
    ): Promise<boolean> => {

        try {

            setLoadingAddUser(true);
            setMsg(null);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password1,
                        password2,
                        role
                    })
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la création de l'utilisateur"
                );

                return false;
            }


            await getAllUsers();

            setShowAddUserPop(false);

            return true;


        } catch (err) {

            console.error(err);

            setMsg(
                "Erreur réseau, veuillez réessayer"
            );

            return false;

        } finally {

            setLoadingAddUser(false);
        }
    };


    // =====================================================
    // DELETE USER
    // =====================================================

    const deleteUser = async (
        id: string
    ): Promise<boolean> => {

        try {

            setLoadingDeleteUser(true);
            setMsg(null);


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            if (!res.ok) {

                setMsg(
                    data.error ||
                    data.message ||
                    "Erreur lors de la suppression de l'utilisateur"
                );

                return false;
            }


            await getAllUsers();

            setShowDeleteUserPop(false);

            setUserDetails(null);

            return true;


        } catch (err) {

            console.error(err);

            setMsg(
                "Erreur réseau, veuillez réessayer"
            );

            return false;

        } finally {

            setLoadingDeleteUser(false);
        }
    };


    // =====================================================
    // RESET PAGE WHEN FILTER CHANGES
    // =====================================================

    useEffect(() => {

        setCurrentPage(1);

    }, [search, role]);


    // =====================================================
    // FETCH USERS
    // =====================================================

    useEffect(() => {

        if (!token) return;

        getAllUsers();

    }, [
        
        currentPage,
        pageLimit,
        search,
        role
    ]);


    // =====================================================
    // PROVIDER
    // =====================================================

    return (
        <UsersAdminContext.Provider
            value={{

                // Users
                allUsers,
                loadingAllUsers,
                getAllUsers,


                // Filters
                search,
                setSearch,

                role,
                setRole,


                // Pagination
                currentPage,
                setCurrentPage,

                pageLimit,
                setPageLimit,

                pagination,


                // Update
                updateUser,
                loadingUpdateUser,


                // Add
                addUser,
                loadingAddUser,


                // Delete
                deleteUser,
                loadingDeleteUser,


                // Popups
                showAddUserPop,
                setShowAddUserPop,

                showUpdateUserPop,
                setShowUpdateUserPop,

                showDeleteUserPop,
                setShowDeleteUserPop,


                // Details
                userDetails,
                setUserDetails,


                // Message
                msg
            }}
        >
            {children}
        </UsersAdminContext.Provider>
    );
};


// =========================================================
// HOOK
// =========================================================

export const useUsersAdminContext = () => {

    const context =
        useContext(UsersAdminContext);


    if (!context) {

        throw new Error(
            "Please use useUsersAdminContext inside the UsersAdminProvider"
        );
    }


    return context;
};

