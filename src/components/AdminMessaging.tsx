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

                    <button
                      onClick={() => setShowTemplateForm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span>New Template</span>
                    </button>