"use client";

import Link from 'next/link';
import { IoAddOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { useAgents, Agent } from '@/hooks/useAgents';
import { useState } from 'react';
import Select from 'react-select';
import { languages, languageOptions } from '@/hooks/useMultilingualFields';

export default function AgentsTableClient({ initialAgents }: { initialAgents: Agent[] }) {
  const {
    agents,
    loading,
    error,
    editAgent,
    setEditAgent,
    deleteAgent,
    setDeleteAgent,
    deleteAgentById,
    updateAgent,
  } = useAgents(initialAgents);


  const [editForm, setEditForm] = useState<Agent | null>(null);


  const handleOpenEdit = (agent: Agent) => {
    setEditAgent(agent);
    setEditForm({ ...agent });
  };


  const handleCloseEdit = () => {
    setEditAgent(null);
    setEditForm(null);
  };


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };


  const handleEditSave = () => {
    if (editForm) {
      updateAgent(editForm);
      handleCloseEdit();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agents</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your real estate agents
          </p>
        </div>
        <Link
          href="/admin/agents/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
        >
          <IoAddOutline className="text-xl" />
          <span>Add Agent</span>
        </Link>
      </div>

      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Languages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} className="text-center py-8 text-red-500">{error}</td></tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No agents found. Create your first agent to get started.
                  </td>
                </tr>
              ) : (
                agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {agent.photo_url && (
                          <img
                            src={agent.photo_url}
                            alt={`${agent.first_name} ${agent.last_name}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {agent.first_name} {agent.last_name}
                          </div>
                          {agent.position_de && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {agent.position_de}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{agent.email}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{agent.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {agent.languages?.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 text-[10px] bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${agent.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-300'
                          }`}
                      >
                        {agent.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                          title="Edit"
                          onClick={() => handleOpenEdit(agent)}
                        >
                          <IoCreateOutline className="text-lg" />
                        </button>
                        <button
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                          title="Delete"
                          onClick={() => setDeleteAgent(agent)}
                        >
                          <IoTrashOutline className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {editAgent && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={handleCloseEdit}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Agent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={editForm.first_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={editForm.last_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo_url"
                  value={editForm.photo_url || ''}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Position (DE)</label>
                <input
                  type="text"
                  name="position_de"
                  value={editForm.position_de || ''}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Languages</label>
                <Select
                  isMulti
                  options={languageOptions}
                  value={languageOptions.filter(opt => editForm.languages?.includes(opt.value))}
                  onChange={selected =>
                    setEditForm({
                      ...editForm,
                      languages: selected ? selected.map(s => s.value) : [],
                    })
                  }
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                  placeholder="Select languages..."
                  formatOptionLabel={option => (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.2em' }}>{option.flag}</span>
                      <span>{option.value}</span>
                    </span>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Active</label>
                <select
                  name="is_active"
                  value={editForm.is_active ? 'true' : 'false'}
                  onChange={e =>
                    setEditForm({
                      ...editForm,
                      is_active: e.target.value === 'true',
                    })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-600"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200" onClick={handleCloseEdit}>Cancel</button>
              <button className="px-4 py-2 rounded bg-primary text-white" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setDeleteAgent(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Delete Agent</h2>
            <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{deleteAgent.first_name} {deleteAgent.last_name}</span>?</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200" onClick={() => setDeleteAgent(null)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={() => deleteAgentById(deleteAgent.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
