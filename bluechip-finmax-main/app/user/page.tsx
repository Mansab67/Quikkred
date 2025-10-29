'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  DollarSign, CreditCard, User, Bell, Settings,
  TrendingUp, Calendar, Clock, Download, Plus,
  IndianRupee, Percent, Target, CheckCircle,
  AlertTriangle, FileText, Phone, Mail, MapPin,
  Building, Award, Star, ArrowUpRight, ArrowDownRight,
  Wallet, Calculator, Eye, EyeOff, RefreshCw,
  Shield, UserCheck, History, Gift, HelpCircle,
  Smartphone, Globe, Heart, Zap, Activity,
  PieChart, BarChart3, TrendingDown, Package,
  CopyIcon, ExternalLink, ChevronRight, Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast, Toaster } from '@/components/ui/toast';
// UserLayout is already applied by ConditionalLayout based on user role

interface UserDashboardData {
  profile: {
    name: string;
    email: string;
    phone: string;
    kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
    creditScore: number;
    tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
    memberSince: string;
    profileCompletion: number;
    avatar?: string;
  };
  loans: {
    active: Array<{
      id: string;
      type: string;
      amount: number;
      emi: number;
      nextDueDate: string;
      remainingAmount: number;
      status: string;
      interestRate: number;
      tenure: number;
      completedMonths: number;
    }>;
    history: Array<{
      id: string;
      type: string;
      amount: number;
      status: string;
      appliedDate: string;
      disbursedDate?: string;
      closedDate?: string;
    }>;
  };
  financials: {
    totalBorrowed: number;
    totalRepaid: number;
    currentOutstanding: number;
    nextEmiAmount: number;
    nextEmiDate: string;
    creditLimit: number;
    availableCredit: number;
    lastPaymentDate: string;
    lastPaymentAmount: number;
  };
  rewards: {
    totalPoints: number;
    currentTier: string;
    nextTierRequirement: number;
    recentEarnings: Array<{
      points: number;
      reason: string;
      date: string;
    }>;
  };
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'WARNING' | 'SUCCESS' | 'PAYMENT';
    isRead: boolean;
    createdAt: string;
  }>;
  quickActions: Array<{
    title: string;
    description: string;
    icon: string;
    action: string;
    enabled: boolean;
  }>;
}

export default function UserDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'payments' | 'profile'>('overview');
  const [creditScoreData, setCreditScoreData] = useState<any>(null);

  // Check authentication and authorization
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        router.push('/login');
        return;
      }

      if (user.role !== 'USER' && user.role !== 'CUSTOMER') {
        console.log('User not authorized for user dashboard:', user.role);
        router.push('/login');
        return;
      }

      console.log('User authorized for user dashboard:', user.role);
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Get auth token
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');

      if (!token) {
        console.error('No auth token found');
        router.push('/login');
        return;
      }

      // Fetch loans, documents, and credit score (profile already loaded by AuthContext)
      const [loansResponse, documentsResponse, creditScoreResponse] = await Promise.all([
        fetch('https://api.Quikkred.com/api/loans/my-loans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('https://api.Quikkred.com/api/document/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('https://api.Quikkred.com/api/creditScore/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      const loansResult = await loansResponse.json();
      const documentsResult = await documentsResponse.json();
      const creditScoreResult = await creditScoreResponse.json();

      // Store credit score data
      if (creditScoreResult.success && creditScoreResult.data) {
        setCreditScoreData(creditScoreResult.data);
      }

      // Map loans data from API
      const allLoansList = loansResult.success && loansResult.data
        ? loansResult.data.map((loan: any) => ({
            id: loan.loanNumber,
            type: loan.loanType,
            amount: loan.requestedAmount,
            emi: Math.round((loan.requestedAmount * (loan.interestRate / 100 / 12) * Math.pow(1 + loan.interestRate / 100 / 12, loan.tenure)) / (Math.pow(1 + loan.interestRate / 100 / 12, loan.tenure) - 1)),
            nextDueDate: new Date(loan.applicationDate).toISOString(),
            remainingAmount: loan.outstandingAmount,
            status: loan.status,
            interestRate: loan.interestRate,
            tenure: loan.tenure,
            completedMonths: 0
          }))
        : [];

      // Filter only approved/active/disbursed loans for financial calculations
      const approvedLoansList = allLoansList.filter((loan: any) => {
        const statusLower = loan.status.toLowerCase();
        return statusLower === 'active' || statusLower === 'approved' || statusLower === 'disbursed';
      });

      // Calculate financials from approved loans only
      const totalBorrowed = approvedLoansList.reduce((sum: number, loan: any) => sum + loan.amount, 0);
      const currentOutstanding = approvedLoansList.reduce((sum: number, loan: any) => sum + loan.remainingAmount, 0);
      const nextEmiAmount = approvedLoansList.reduce((sum: number, loan: any) => sum + loan.emi, 0);

      // Map API data to dashboard structure (use user from AuthContext for profile)
      const mappedData: UserDashboardData = {
        profile: {
          name: user?.name || 'User',
          email: user?.email || '',
          phone: user?.mobile || '',
          kycStatus: user?.kycStatus || 'PENDING',
          creditScore: creditScoreResult.success && creditScoreResult.data ? creditScoreResult.data.internalScore : 0,
          tier: 'BRONZE',
          memberSince: user?.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          profileCompletion: 95,
        },
          loans: {
            active: approvedLoansList.filter((loan: any) => {
              const statusLower = loan.status.toLowerCase();
              return statusLower !== 'closed' && statusLower !== 'completed';
            }),
            history: allLoansList.filter((loan: any) => {
              const statusLower = loan.status.toLowerCase();
              return statusLower === 'closed' || statusLower === 'completed';
            }).map((loan: any) => ({
              id: loan.id,
              type: loan.type,
              amount: loan.amount,
              status: loan.status,
              appliedDate: loan.nextDueDate,
              disbursedDate: undefined,
              closedDate: undefined
            }))
          },
          financials: {
            totalBorrowed,
            totalRepaid: totalBorrowed - currentOutstanding,
            currentOutstanding,
            nextEmiAmount,
            nextEmiDate: approvedLoansList.length > 0 ? approvedLoansList[0].nextDueDate : '',
            creditLimit: 1000000,
            availableCredit: 1000000 - currentOutstanding,
            lastPaymentDate: '',
            lastPaymentAmount: 0
          },
          rewards: {
            totalPoints: 0,
            currentTier: 'BRONZE',
            nextTierRequirement: 0,
            recentEarnings: []
          },
          notifications: [],
          quickActions: [
            {
              title: 'Apply for Loan',
              description: 'Get instant approval',
              icon: 'plus',
              action: '/apply',
              enabled: true
            },
            {
              title: 'Track Application',
              description: 'Check loan status',
              icon: 'search',
              action: '/user/track-application',
              enabled: true
            }
          ]
      };

      setData(mappedData);
 
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: "error",
        title: "Error Loading Data",
        description: "Unable to fetch your dashboard data. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'text-green-400 bg-green-900/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-900/20';
      case 'REJECTED': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'from-purple-600 to-pink-600';
      case 'GOLD': return 'from-yellow-600 to-orange-600';
      case 'SILVER': return 'from-gray-400 to-gray-600';
      case 'BRONZE': return 'from-orange-700 to-red-700';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#2E7D32] border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or not authorized, don't render anything (redirect will happen)
  if (!user || (user.role !== 'USER' && user.role !== 'CUSTOMER')) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Access denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-[#2E7D32] border-t-transparent rounded-full mx-auto"
            />
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6">
        {/* Header with Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD700]" />
                <span className="break-words">Welcome back, {data?.profile.name?.split(' ')[0]}!</span>
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Here's your financial overview</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <div className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20">
                <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {data?.profile.kycStatus}
              </div>
              {/* <div className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-gradient-to-r from-[#FFD700] to-[#FBC02D] text-white">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {data?.profile.tier}
              </div> */}
            </div>
          </div>
        </motion.div>

        {/* Profile Info Card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-[#E0E0E0] mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-[#1976D2]" />
            <h2 className="text-xl font-semibold text-[#1B5E20]">Profile Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
              <User className="w-5 h-5 text-[#1976D2]" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{user?.name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
              <Mail className="w-5 h-5 text-[#1976D2]" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800">{user?.email || 'N/A'}</p>
                  {user?.isEmailVerified && (
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
              <Phone className="w-5 h-5 text-[#1976D2]" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Mobile</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800">{user?.mobile || 'N/A'}</p>
                  {user?.isMobileVerified && (
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  )}
                </div>
              </div>
            </div>
            {user?.city && (
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                <MapPin className="w-5 h-5 text-[#1976D2]" />
                <div>
                  <p className="text-xs text-gray-500">City</p>
                  <p className="font-medium text-gray-800">{user.city}, {user.state}</p>
                </div>
              </div>
            )}
            {user?.pincode && (
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                <Building className="w-5 h-5 text-[#1976D2]" />
                <div>
                  <p className="text-xs text-gray-500">Pincode</p>
                  <p className="font-medium text-gray-800">{user.pincode}</p>
                </div>
              </div>
            )}
            {user?.dateOfBirth && (
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                <Calendar className="w-5 h-5 text-[#1976D2]" />
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-800">
                    {new Date(user.dateOfBirth).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
            {user?.status && (
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                <Shield className="w-5 h-5 text-[#1976D2]" />
                <div>
                  <p className="text-xs text-gray-500">Account Status</p>
                  <p className={`font-medium ${user.status === 'ACTIVE' ? 'text-[#2E7D32]' : 'text-gray-800'}`}>
                    {user.status}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div> */}

        {/* Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Current Outstanding */}
          <div className="bg-white rounded-2xl p-6 border border-[#E0E0E0] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#0D47A1]/10 rounded-xl">
                <IndianRupee className="w-6 h-6 text-[#0D47A1]" />
              </div>
              <span className="text-xs text-gray-500">Outstanding</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {showBalance ? formatCurrency(data?.financials.currentOutstanding || 0) : '••••••'}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showBalance ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Next EMI */}
          {data?.financials && data.financials.nextEmiAmount > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-[#E0E0E0] hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#FBC02D]/10 rounded-xl">
                  <Calendar className="w-6 h-6 text-[#FBC02D]" />
                </div>
                <span className="text-xs text-gray-500">Next EMI</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {formatCurrency(data?.financials.nextEmiAmount || 0)}
              </p>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-[#FBC02D]" />
                <span className="text-gray-600">
                  Due {new Date(data?.financials.nextEmiDate || '').toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Active Loans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1B5E20] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1976D2]" />
              Active Loans ({data?.loans.active.length || 0})
            </h2>
            {/* <button
              onClick={() => {
                toast({
                  variant: "success",
                  title: "Starting Application",
                  description: "Let's get you a new loan!"
                });
                router.push('/apply');
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span>Apply New</span>
            </button> */}
          </div>

          {data?.loans.active && data.loans.active.length > 0 ? (
            <div className="grid gap-4 sm:gap-6">
              {data.loans.active.map((loan) => (
              <motion.div
                key={loan.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl p-4 sm:p-6 border border-[#E0E0E0] hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{loan.type}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 text-xs sm:text-sm">Loan ID: {loan.id}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(loan.id);
                          toast({
                            variant: "success",
                            title: "Copied!",
                            description: "Loan ID copied to clipboard"
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <CopyIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl sm:text-2xl font-bold text-[#1B5E20]">{formatCurrency(loan.amount)}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Principal Amount</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Monthly EMI</p>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">{formatCurrency(loan.emi)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Interest Rate</p>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Remaining</p>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">{formatCurrency(loan.remainingAmount)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Progress</p>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">{loan.completedMonths}/{loan.tenure} months</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                    <span>Repayment Progress</span>
                    <span className="text-[#2E7D32] font-medium">{Math.round((loan.completedMonths / loan.tenure) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(loan.completedMonths / loan.tenure) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-[#E0E0E0]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-[#FBC02D]" />
                    <span className="text-gray-600">
                      Next Due: {new Date(loan.nextDueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => router.push('/user/loans')}
                      className="flex-1 sm:flex-none px-3 py-2 bg-[#FAFAFA] border border-[#E0E0E0] text-gray-700 rounded text-xs sm:text-sm hover:bg-[#E0E0E0] transition-colors">
                      View Details
                    </button>
                    {(loan.status.toLowerCase() === 'approved' ||
                      loan.status.toLowerCase() === 'active' ||
                      loan.status.toLowerCase() === 'disbursed') && (
                      <button
                        onClick={() => {
                          toast({
                            variant: "info",
                            title: "Payment Gateway",
                            description: "Redirecting to payment gateway..."
                          });
                          // Payment logic would go here
                        }}
                        className="flex-1 sm:flex-none px-3 py-2 bg-[#1976D2] text-white rounded text-xs sm:text-sm hover:bg-[#0D47A1] transition-colors">
                        Pay EMI
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#E0E0E0] text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#FAFAFA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Active Loans</h3>
                <p className="text-gray-600 mb-6">Start your financial journey with us today</p>
                <button
                  onClick={() => {
                    toast({
                      variant: "success",
                      title: "Welcome!",
                      description: "Let's start your first loan application"
                    });
                    router.push('/apply');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Apply for Your First Loan
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}

      </div>
      <Toaster />
    </>
  );
}