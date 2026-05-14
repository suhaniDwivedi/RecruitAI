import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  Settings, 
  Layout, 
  Mail, 
  CheckCircle, 
  Save, 
  Loader, 
  Plus, 
  Trash2, 
  Globe,
  Briefcase,
  Users
} from 'lucide-react';
import api from '../utils/api';
import { showToast } from '../utils/toast';

const CompanySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'stages' | 'emails'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const res = await api.get('/api/companies/me/');
      setCompanyData(res.data);
    } catch (err) {
      showToast.error('Failed to load company settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch('/api/companies/me/', companyData);
      showToast.success('Settings saved successfully!');
    } catch (err) {
      showToast.error('Failed to save settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  const updateSettingField = (category: 'hiring_preferences' | 'email_templates', field: string, value: any) => {
    setCompanyData({
      ...companyData,
      [category]: {
        ...companyData[category],
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!companyData) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
        activeTab === id 
        ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Settings size={20} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Company Settings</h1>
            </div>
            <p className="text-slate-500">Manage your organization's profile and hiring workflows</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md shadow-blue-600/20 disabled:bg-slate-400"
          >
            {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar">
            <TabButton id="profile" label="Profile" icon={Building2} />
            <TabButton id="preferences" label="Preferences" icon={CheckCircle} />
            <TabButton id="stages" label="Interview Stages" icon={Layout} />
            <TabButton id="emails" label="Email Templates" icon={Mail} />
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <Building2 size={18} />
                      </div>
                      <input
                        type="text"
                        value={companyData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Domain / Website</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <Globe size={18} />
                      </div>
                      <input
                        type="url"
                        value={companyData.domain || ''}
                        onChange={(e) => updateField('domain', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="https://acme.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <Briefcase size={18} />
                      </div>
                      <input
                        type="text"
                        value={companyData.industry || ''}
                        onChange={(e) => updateField('industry', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Technology"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Size</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <Users size={18} />
                      </div>
                      <select
                        value={companyData.size || ''}
                        onChange={(e) => updateField('size', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                      >
                        <option value="">Select Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 max-w-2xl">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900">Auto-Schedule Interviews</h4>
                      <p className="text-sm text-slate-500">Automatically send interview invites to qualified candidates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={companyData.hiring_preferences.auto_schedule || false}
                        onChange={(e) => updateSettingField('hiring_preferences', 'auto_schedule', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900">AI-Powered Shortlisting</h4>
                      <p className="text-sm text-slate-500">Use agent intelligence to pre-score and rank candidates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={companyData.hiring_preferences.ai_shortlisting !== false}
                        onChange={(e) => updateSettingField('hiring_preferences', 'ai_shortlisting', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Interview Stages Tab */}
            {activeTab === 'stages' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-6">
                  <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm text-blue-800">
                    Define the sequence of stages for your hiring pipeline. Agents will move candidates through these stages based on their evaluations.
                  </p>
                </div>
                
                <div className="space-y-3 max-w-2xl">
                  {companyData.interview_stages.map((stage: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition-all group">
                      <div className="bg-slate-100 text-slate-500 font-bold w-8 h-8 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={stage.name}
                        onChange={(e) => {
                          const newStages = [...companyData.interview_stages];
                          newStages[index].name = e.target.value;
                          updateField('interview_stages', newStages);
                        }}
                        className="flex-1 font-semibold text-slate-800 outline-none bg-transparent"
                      />
                      <button 
                        onClick={() => {
                          const newStages = companyData.interview_stages.filter((_: any, i: number) => i !== index);
                          updateField('interview_stages', newStages);
                        }}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newStages = [
                        ...companyData.interview_stages,
                        { id: `custom_${Date.now()}`, name: 'New Stage', order: companyData.interview_stages.length + 1 }
                      ];
                      updateField('interview_stages', newStages);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                  >
                    <Plus size={18} />
                    Add Custom Stage
                  </button>
                </div>
              </div>
            )}

            {/* Email Templates Tab */}
            {activeTab === 'emails' && (
              <div className="space-y-8 max-w-3xl">
                {Object.keys(companyData.email_templates).map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      {key.replace(/_/g, ' ')} Template
                      <span className="text-slate-400 lowercase normal-case font-normal italic">Variables: {'{name}'}, {'{job_title}'}, {'{company_name}'}</span>
                    </label>
                    <textarea
                      value={companyData.email_templates[key]}
                      onChange={(e) => updateSettingField('email_templates', key, e.target.value)}
                      rows={4}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
