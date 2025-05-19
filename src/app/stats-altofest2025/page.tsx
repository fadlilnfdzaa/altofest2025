'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClickCategories } from '@/utils/clickTracker';

// Define the structure of a click event
interface ClickEvent {
  category: string;
  label: string;
  url?: string;
  timestamp: string;
}

// Define the structure of the clicks data
interface ClicksData {
  events: ClickEvent[];
  categoryCounts: Record<string, number>;
  labelCounts: Record<string, number>;
  urlCounts: Record<string, number>;
  totalClicks: number;
}

export default function StatsPage() {
  const [data, setData] = useState<ClicksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'labels' | 'urls' | 'events'>('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/clicks');
        if (!response.ok) {
          throw new Error('Failed to fetch click statistics');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case ClickCategories.NAVIGATION:
        return 'bg-[#7de6e9]';
      case ClickCategories.TICKETS:
        return 'bg-[#ffc700]';
      case ClickCategories.SOCIAL:
        return 'bg-[#237ea5]';
      case ClickCategories.CONTACT:
        return 'bg-[#7a3c20]';
      default:
        return 'bg-gray-400';
    }
  };

  // Function to calculate percentage
  const calculatePercentage = (count: number) => {
    if (!data || data.totalClicks === 0) return 0;
    return Math.round((count / data.totalClicks) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#ffc700] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">Memuat statistik klik...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-red-50 rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <Link href="/" className="bg-[#333333] text-[#FFC700] font-bold py-2 px-6 rounded-full">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-yellow-50 rounded-lg">
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">Tidak Ada Data</h1>
          <p className="mb-6">Belum ada data statistik klik yang tersedia.</p>
          <Link href="/" className="bg-[#333333] text-[#FFC700] font-bold py-2 px-6 rounded-full">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">ALTOFEST 2025</h1>
              <p className="text-background/80">Statistik Klik Dashboard</p>
            </div>
            <Link href="/" className="bg-[#FFC700] text-[#333333] font-bold py-2 px-6 rounded-full hover:bg-[#FFD700] transition-all">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#ffc700]/20 hover:shadow-[0_0_30px_rgba(255,199,0,0.15)] transition-all">
            <h2 className="text-lg font-medium text-foreground/70">Total Klik</h2>
            <p className="text-4xl font-bold mt-2">{data.totalClicks}</p>
          </div>
          
          <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#7de6e9]/20 hover:shadow-[0_0_30px_rgba(125,230,233,0.15)] transition-all">
            <h2 className="text-lg font-medium text-foreground/70">Kategori</h2>
            <p className="text-4xl font-bold mt-2">{Object.keys(data.categoryCounts).length}</p>
          </div>
          
          <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#237ea5]/20 hover:shadow-[0_0_30px_rgba(35,126,165,0.15)] transition-all">
            <h2 className="text-lg font-medium text-foreground/70">Label Unik</h2>
            <p className="text-4xl font-bold mt-2">{Object.keys(data.labelCounts).length}</p>
          </div>
          
          <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#7a3c20]/20 hover:shadow-[0_0_30px_rgba(122,60,32,0.15)] transition-all">
            <h2 className="text-lg font-medium text-foreground/70">URL Unik</h2>
            <p className="text-4xl font-bold mt-2">{Object.keys(data.urlCounts).length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-foreground/10">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-[#ffc700] text-foreground' : 'text-foreground/60 hover:text-foreground/80'}`}
            >
              Ringkasan
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'categories' ? 'border-b-2 border-[#7de6e9] text-foreground' : 'text-foreground/60 hover:text-foreground/80'}`}
            >
              Kategori
            </button>
            <button 
              onClick={() => setActiveTab('labels')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'labels' ? 'border-b-2 border-[#237ea5] text-foreground' : 'text-foreground/60 hover:text-foreground/80'}`}
            >
              Label
            </button>
            <button 
              onClick={() => setActiveTab('urls')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'urls' ? 'border-b-2 border-[#7a3c20] text-foreground' : 'text-foreground/60 hover:text-foreground/80'}`}
            >
              URL
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'events' ? 'border-b-2 border-gray-400 text-foreground' : 'text-foreground/60 hover:text-foreground/80'}`}
            >
              Semua Klik
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-foreground/10">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ringkasan Klik</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Distribusi Kategori</h3>
                <div className="space-y-4">
                  {Object.entries(data.categoryCounts)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([category, count]) => (
                      <div key={category} className="relative">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{category}</span>
                          <span>{count} klik ({calculatePercentage(count)}%)</span>
                        </div>
                        <div className="w-full bg-foreground/10 rounded-full h-4 overflow-hidden">
                          <div 
                            className={`${getCategoryColor(category)} h-4 rounded-full`} 
                            style={{ width: `${calculatePercentage(count)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Top 5 Label Terpopuler</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-foreground/10">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Label</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Klik</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/10">
                      {Object.entries(data.labelCounts)
                        .sort(([, countA], [, countB]) => countB - countA)
                        .slice(0, 5)
                        .map(([label, count]) => (
                          <tr key={label}>
                            <td className="px-6 py-4 whitespace-nowrap">{label}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{calculatePercentage(count)}%</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Statistik Kategori</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-foreground/10">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Klik</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Persentase</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Visualisasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {Object.entries(data.categoryCounts)
                      .sort(([, countA], [, countB]) => countB - countA)
                      .map(([category, count]) => (
                        <tr key={category}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)} mr-2`}></div>
                              {category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{calculatePercentage(count)}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-full bg-foreground/10 rounded-full h-4 overflow-hidden">
                              <div 
                                className={`${getCategoryColor(category)} h-4 rounded-full`} 
                                style={{ width: `${calculatePercentage(count)}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Labels Tab */}
          {activeTab === 'labels' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Statistik Label</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-foreground/10">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Label</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Klik</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Persentase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {Object.entries(data.labelCounts)
                      .sort(([, countA], [, countB]) => countB - countA)
                      .map(([label, count]) => (
                        <tr key={label}>
                          <td className="px-6 py-4 whitespace-nowrap">{label}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{calculatePercentage(count)}%</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* URLs Tab */}
          {activeTab === 'urls' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Statistik URL</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-foreground/10">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Klik</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Persentase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {Object.entries(data.urlCounts)
                      .sort(([, countA], [, countB]) => countB - countA)
                      .map(([url, count]) => (
                        <tr key={url}>
                          <td className="px-6 py-4">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#237ea5] hover:underline truncate block max-w-xs">
                              {url}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{calculatePercentage(count)}%</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Semua Klik</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-foreground/10">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Waktu</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Label</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">URL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {data.events
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((event, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(event.timestamp)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)} mr-2`}></div>
                              {event.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{event.label}</td>
                          <td className="px-6 py-4">
                            {event.url ? (
                              <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-[#237ea5] hover:underline truncate block max-w-xs">
                                {event.url}
                              </a>
                            ) : (
                              <span className="text-foreground/50">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 ALTOFEST. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
