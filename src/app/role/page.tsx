"use client";
import { useEffect, useState, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { setloader } from "../../../store/slices/loaderSlice";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const dispatch = useAppDispatch();

  // Memoize fetchRoles to prevent unnecessary re-renders
  const fetchRoles = useCallback(async () => {
    try {
      dispatch(setloader(true));
      const response = await fetch("/api/role");

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
      } else {
        alert("Failed to fetch roles.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("An error occurred while fetching roles.");
    } finally {
      dispatch(setloader(false));
    }
  }, [dispatch]); // Add dispatch to the dependency array

  // Use useEffect with fetchRoles in the dependency array
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Add a new role
  const handleAddRole = async () => {
    if (newRole.trim() && !roles.some((role) => role.role === newRole.trim().toLowerCase())) {
      try {
        dispatch(setloader(true));
        const response = await fetch("/api/role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        });

        if (response.ok) {
          await response.json();
          setNewRole("");
          // Refetch roles to ensure the latest data
          fetchRoles();
        } else {
          alert("Failed to add role.");
        }
      } catch (error) {
        console.error("Error adding role:", error);
        alert("An error occurred while adding the role.");
      } finally {
        dispatch(setloader(false));
      }
    } else {
      alert("Role already exists or is invalid.");
    }
  };

  // Delete a role
  const handleDeleteRole = async (roleName) => {
    try {
      dispatch(setloader(true));
      const response = await fetch("/api/role", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: roleName }),
      });

      if (response.ok) {
        // Refetch roles to ensure the latest data
        fetchRoles();
      } else {
        alert("Failed to delete role.");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      alert("An error occurred while deleting the role.");
    } finally {
      dispatch(setloader(false));
    }
  };

  // Render delete button in the DataTable
  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => handleDeleteRole(rowData.role)}
      />
    );
  };

  return (
    <div className="p-m-4">
      <h1>Role Management</h1>

      {/* Add Role Section */}
      <div className="p-grid p-align-center p-mb-4">
        <div className="p-col-8">
          <InputText
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter a new role"
            className="p-inputtext-lg p-fluid"
          />
        </div>
        <div className="p-col-4">
          <Button
            label="Add Role"
            icon="pi pi-plus"
            className="p-button-success p-button-lg"
            onClick={handleAddRole}
          />
        </div>
      </div>

      <DataTable value={roles} className="p-datatable-striped">
        <Column field="role" header="Role Name" />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>
    </div>
  );
}