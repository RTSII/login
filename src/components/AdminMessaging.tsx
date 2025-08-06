import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User,
  FileText,
  Mail,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface MessageTemplate {
  id: string;
  template_name: string;
  subject_template: string;
  content_template: string;
  is_default: boolean;
}

interface Owner {
  id: string;
  user_id: string;
  unit_number: string;
  first_name: string;
  last_name: string;
  email: string;
}

const AdminMessaging: React.FC = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadTemplates();
    loadOwners();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_message_templates')
        .select('*')
        .order('template_name');
      
      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      console.error('Error loading templates:', err);
    }
  };

  const loadOwners = async () => {
    try {
      const { data, error } = await supabase
        .from('owner_profiles')
        .select('id, user_id, unit_number, first_name, last_name, email')
        .order('unit_number');
      
      if (error) throw error;
      setOwners(data || []);
    } catch (err) {
      console.error('Error loading owners:', err);
    }
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setSubject(template.subject_template);
    setMessage(template.content_template);
  };

  const handleSendMessage = async () => {
    if (!subject || !message || selectedOwners.length === 0) {
      setError('Please fill in all fields and select at least one recipient');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const messages = selectedOwners.map(ownerId => ({
        recipient_user_id: owners.find(o => o.id === ownerId)?.user_id,
        subject,
        content: message,
        sender_type: 'admin',
        message_type: 'admin_message'
      }));

      const { error } = await supabase
        .from('site_messages')
        .insert(messages);

      if (error) throw error;

      setSuccess(`Message sent to ${selectedOwners.length} recipient(s)`);
      setSubject('');
      setMessage('');
      setSelectedOwners([]);
      setSelectedTemplate(null);
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!editingTemplate?.template_name || !editingTemplate?.subject_template || !editingTemplate?.content_template) {
      setError('Please fill in all template fields');
      return;
    }

    setLoading(true);
    try {
      if (editingTemplate.id) {
        const { error } = await supabase
          .from('admin_message_templates')
          .update({
            template_name: editingTemplate.template_name,
            subject_template: editingTemplate.subject_template,
            content_template: editingTemplate.content_template
          })
          .eq('id', editingTemplate.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('admin_message_templates')
          .insert({
            template_name: editingTemplate.template_name,
            subject_template: editingTemplate.subject_template,
            content_template: editingTemplate.content_template
          });
        
        if (error) throw error;
      }

      setSuccess('Template saved successfully');
      setIsEditing(false);
      setEditingTemplate(null);
      loadTemplates();
    } catch (err) {
      setError('Failed to save template');
      console.error('Error saving template:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const { error } = await supabase
        .from('admin_message_templates')
        .delete()
        .eq('id', templateId);
      
      if (error) throw error;
      
      setSuccess('Template deleted successfully');
      loadTemplates();
    } catch (err) {
      setError('Failed to delete template');
      console.error('Error deleting template:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MessageSquare className="mr-3 text-blue-600" />
          Admin Messaging System
        </h2>

        {/* Status Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Composition */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <Mail className="mr-2" />
              Compose Message
            </h3>

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template (Optional)
              </label>
              <select
                value={selectedTemplate?.id || ''}
                onChange={(e) => {
                  const template = templates.find(t => t.id === e.target.value);
                  if (template) handleTemplateSelect(template);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a template...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.template_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter message subject..."
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your message..."
              />
            </div>

            {/* Recipient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients ({selectedOwners.length} selected)
              </label>
              <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOwners.length === owners.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOwners(owners.map(o => o.id));
                      } else {
                        setSelectedOwners([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">Select All</span>
                </label>
                {owners.map(owner => (
                  <label key={owner.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedOwners.includes(owner.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOwners([...selectedOwners, owner.id]);
                        } else {
                          setSelectedOwners(selectedOwners.filter(id => id !== owner.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Unit {owner.unit_number} - {owner.first_name} {owner.last_name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={loading || !subject || !message || selectedOwners.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>

          {/* Template Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FileText className="mr-2" />
                Message Templates
              </h3>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditingTemplate({
                    id: '',
                    template_name: '',
                    subject_template: '',
                    content_template: '',
                    is_default: false
                  });
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Template</span>
              </button>
            </div>

            {/* Template List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {templates.map(template => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{template.template_name}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setEditingTemplate(template);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Subject:</strong> {template.subject_template}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Content:</strong> {template.content_template.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template Editor Modal */}
      {isEditing && editingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingTemplate.id ? 'Edit Template' : 'New Template'}
              </h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingTemplate(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={editingTemplate.template_name}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    template_name: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Template
                </label>
                <input
                  type="text"
                  value={editingTemplate.subject_template}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    subject_template: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject template..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Template
                </label>
                <textarea
                  value={editingTemplate.content_template}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    content_template: e.target.value
                  })}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter content template..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingTemplate(null);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save Template'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessaging;