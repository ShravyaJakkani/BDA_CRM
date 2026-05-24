import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Leads',
      value: '248',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Conversion Rate',
      value: '32%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      name: 'Revenue',
      value: '$84,230',
      change: '+18.7%',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Active Deals',
      value: '45',
      change: '+8.1%',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ]

  const recentLeads = [
    { name: 'John Smith', company: 'Tech Corp', status: 'New', date: '2024-01-15' },
    { name: 'Sarah Johnson', company: 'Innovate Ltd', status: 'Contacted', date: '2024-01-14' },
    { name: 'Mike Brown', company: 'StartUp Inc', status: 'In Progress', date: '2024-01-13' },
    { name: 'Emily Davis', company: 'Global Solutions', status: 'Converted', date: '2024-01-12' },
    { name: 'David Wilson', company: 'Digital Agency', status: 'New', date: '2024-01-11' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800'
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'In Progress':
        return 'bg-purple-100 text-purple-800'
      case 'Converted':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.map((lead) => (
                <tr key={lead.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
