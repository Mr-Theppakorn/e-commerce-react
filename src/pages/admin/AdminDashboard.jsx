import React from 'react'
import CategoryForm from './categorys/CategoryForm'
import AdminLayout from '../../components/layout/AdminLayout'

const AdminDashboard = ({ user }) => {

    return (
        <AdminLayout>
            <CategoryForm user={user} />
        </AdminLayout>
    )
}

export default AdminDashboard