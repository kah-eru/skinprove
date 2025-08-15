import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Sun, 
  Moon, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Leaf,
  User,
  Bell,
  Settings
} from 'lucide-react'

import { allProducts, Product as ShopProduct } from '../data/products'

type ViewMode = 'month' | 'week'
type TimeSlot = 'AM' | 'PM'

type UserProduct = ShopProduct & {
  dateAdded: string;
  usage: {
    totalUses: number;
    frequency: string;
  };
};

// This would typically be fetched or managed in a global state
const myUserProducts: UserProduct[] = allProducts.slice(0, 4).map((p, i) => ({
  ...p,
  dateAdded: `2023-0${i + 1}-15`,
  usage: {
    totalUses: 50 + i * 20,
    frequency: i % 2 === 0 ? 'Daily' : '3x a week',
  }
}));

interface DayRoutine {
  AM: UserProduct[]
  PM: UserProduct[]
}

const DayView = ({
  date,
  routine,
  isEditing,
  onToggleEdit,
  onProductAdd,
  onProductRemove
}: {
  date: Date,
  routine: DayRoutine,
  isEditing: boolean,
  onToggleEdit: () => void,
  onProductAdd: (slot: TimeSlot) => void,
  onProductRemove: (slot: TimeSlot, productId: number) => void,
}) => {
  
  const RoutineSection = ({ title, products, slot }: { title: string, products: UserProduct[], slot: TimeSlot }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${slot === 'AM' ? 'from-yellow-400 to-orange-500' : 'from-indigo-500 to-purple-600'} rounded-lg flex items-center justify-center`}>
            {slot === 'AM' ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        {isEditing && (
          <button onClick={() => onProductAdd(slot)} className="btn-secondary">
            <Plus className="w-4 h-4 mr-2" /> Add
          </button>
        )}
      </div>

      <div className="space-y-3">
        {products.length > 0 ? products.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500 capitalize">{item.brand}</p>
            </div>
            {isEditing && (
              <button
                onClick={() => onProductRemove(slot, item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Plus className="w-5 h-5 transform rotate-45" />
              </button>
            )}
          </div>
        )) : (
          <p className="text-sm text-gray-500 text-center py-4">No products in this routine.</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={onToggleEdit} className="btn-primary">
          {isEditing ? 'Save Routine' : 'Edit Routine'}
        </button>
      </div>

      <RoutineSection title="Morning Routine" products={routine.AM} slot="AM" />
      <RoutineSection title="Evening Routine" products={routine.PM} slot="PM" />
      
      {/* Tips & Suggestions */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Tips & Suggestions</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Remember to check for conflicts when adding new products to your routine.
          </p>
        </div>
      </div>
    </div>
  )
}


export default function Calendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>('AM')
  const [isEditing, setIsEditing] = useState(false);
  
  const [routines, setRoutines] = useState<Record<string, DayRoutine>>({
    // Example initial state
    [new Date().toISOString().split('T')[0]]: {
      AM: myUserProducts.slice(0, 2),
      PM: [],
    }
  });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    // Here you would typically save the routine to a backend
  }
  
  const handleProductAddClick = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setShowProductSelector(true);
  }

  const [productToSchedule, setProductToSchedule] = useState<UserProduct | null>(null);
  const [frequency, setFrequency] = useState('daily');
  const [customDays, setCustomDays] = useState(2);
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);

  const handleSelectProduct = (product: UserProduct) => {
    setProductToSchedule(product);
  }

  const handleWeekdaySelect = (dayIndex: number) => {
    setSelectedWeekdays(prev =>
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
    );
  }

  const handleConfirmSchedule = () => {
    if (!productToSchedule) return;

    const startDate = new Date(selectedDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    setRoutines(prevRoutines => {
      const newRoutines = { ...prevRoutines };

      for (let day = startDate.getDate(); day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        let shouldAdd = false;

        switch (frequency) {
          case 'daily':
            shouldAdd = true;
            break;
          case 'alternate':
            if ((currentDate.getDate() - startDate.getDate()) % 2 === 0) {
              shouldAdd = true;
            }
            break;
          case 'weekly':
            shouldAdd = selectedWeekdays.includes(currentDate.getDay());
            break;
          case 'custom':
            if ((currentDate.getDate() - startDate.getDate()) % customDays === 0) {
              shouldAdd = true;
            }
            break;
        }
        
        if (shouldAdd) {
          const dateKey = currentDate.toISOString().split('T')[0];
          const currentRoutine = newRoutines[dateKey] || { AM: [], PM: [] };
          // Avoid adding duplicates
          if (!currentRoutine[selectedTimeSlot].find(p => p.id === productToSchedule.id)) {
            newRoutines[dateKey] = {
              ...currentRoutine,
              [selectedTimeSlot]: [...currentRoutine[selectedTimeSlot], productToSchedule]
            };
          }
        }
      }
      return newRoutines;
    });
    
    // Reset and close modal
    setShowProductSelector(false);
    setProductToSchedule(null);
    setFrequency('daily');
    setCustomDays(2);
    setSelectedWeekdays([]);
  }

  const closeModal = () => {
    setShowProductSelector(false);
    setProductToSchedule(null);
  }

  const [productToDelete, setProductToDelete] = useState<{ product: UserProduct, slot: TimeSlot } | null>(null);

  const handleProductRemoveClick = (slot: TimeSlot, productId: number) => {
    const product = myUserProducts.find(p => p.id === productId);
    if (product) {
      setProductToDelete({ product, slot });
    }
  }

  const confirmProductRemove = (deleteFuture: boolean) => {
    if (!productToDelete) return;

    const { product, slot } = productToDelete;
    
    setRoutines(prevRoutines => {
      const newRoutines = { ...prevRoutines };
      
      if (deleteFuture) {
        const startDate = new Date(selectedDate);
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = startDate.getDate(); day <= daysInMonth; day++) {
          const currentDate = new Date(year, month, day);
          const dateKey = currentDate.toISOString().split('T')[0];
          if (newRoutines[dateKey]) {
            newRoutines[dateKey] = {
              ...newRoutines[dateKey],
              [slot]: newRoutines[dateKey][slot].filter(p => p.id !== product.id)
            };
          }
        }
      } else {
        const dateKey = selectedDate.toISOString().split('T')[0];
        if (newRoutines[dateKey]) {
          newRoutines[dateKey] = {
            ...newRoutines[dateKey],
            [slot]: newRoutines[dateKey][slot].filter(p => p.id !== product.id)
          };
        }
      }
      return newRoutines;
    });

    setProductToDelete(null);
  }

  const renderMonthView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
    
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                     selectedDate.getMonth() === new Date().getMonth() &&
                     selectedDate.getFullYear() === new Date().getFullYear()
      
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      const routineForDay = routines[date.toISOString().split('T')[0]];
      const hasAmRoutine = routineForDay && routineForDay.AM.length > 0;
      const hasPmRoutine = routineForDay && routineForDay.PM.length > 0;

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-peach-50 relative ${
            isSelected ? 'bg-peach-200' : 'bg-white'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div
            className={`font-medium text-sm mb-1 ${
              isToday ? 'bg-peach-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-900'
            }`}
          >
            {day}
          </div>
            {(hasAmRoutine || hasPmRoutine) && (
              <div className="space-y-1">
                {hasAmRoutine && <div className="w-2 h-2 bg-peach-400 rounded-full"></div>}
                {hasPmRoutine && <div className="w-2 h-2 bg-peach-600 rounded-full"></div>}
              </div>
            )}
            {isToday && !isSelected && <div className="absolute inset-0 border-2 border-peach-500 rounded-lg pointer-events-none"></div>}
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - selectedDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        weekDays.push(date);
    }
    
    return (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-7">
            {/* Weekday Headers */}
            {weekDays.map(date => (
              <div key={`header-${date.toISOString()}`} className="text-center p-4 border-b border-r border-gray-200">
                <p className="text-sm font-medium text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{date.getDate()}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 h-96">
            {/* Day Columns */}
            {weekDays.map(date => {
              const routineForDay = routines[date.toISOString().split('T')[0]];
              const amProducts = routineForDay?.AM || [];
              const pmProducts = routineForDay?.PM || [];
              return (
                <div
                  key={date.toISOString()}
                  className="border-r border-gray-200 p-2 space-y-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedDate(date)}
                >
                  {amProducts.slice(0, 2).map(p => (
                    <div key={`am-${p.id}`} className="bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-md p-2 text-xs font-medium truncate">
                      {p.name}
                    </div>
                  ))}
                  {amProducts.length > 2 && (
                     <div className="text-xs text-gray-500 pl-2">+ {amProducts.length - 2} more</div>
                  )}
                   {pmProducts.slice(0, 2).map(p => (
                    <div key={`pm-${p.id}`} className="bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-md p-2 text-xs font-medium truncate">
                      {p.name}
                    </div>
                  ))}
                   {pmProducts.length > 2 && (
                     <div className="text-xs text-gray-500 pl-2">+ {pmProducts.length - 2} more</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
    )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-peach-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-peach-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-peach-600 to-peach-800 bg-clip-text text-transparent">
                SkinProve
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-peach-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link to="/profile" className="p-2 text-gray-600 hover:text-peach-600 transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Skincare Calendar</h1>
            <p className="text-gray-600">Plan and organize your daily skincare routine</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              {(['month', 'week'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                    viewMode === mode
                      ? 'bg-peach-500 text-white'
                      : 'text-gray-700 hover:text-peach-600'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                const newDate = new Date(selectedDate);
                if (viewMode === 'month') {
                  newDate.setMonth(newDate.getMonth() - 1);
                } else {
                  newDate.setDate(newDate.getDate() - 7);
                }
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              className="p-2 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                const newDate = new Date(selectedDate);
                if (viewMode === 'month') {
                  newDate.setMonth(newDate.getMonth() + 1);
                } else {
                  newDate.setDate(newDate.getDate() + 7);
                }
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <button className="btn-primary" onClick={() => setSelectedDate(new Date())}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Today
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Calendar Grid */}
          <div className="flex-1">
            {viewMode ==='month' ? renderMonthView() : renderWeekView()}
          </div>

          {/* Day View Sidebar */}
          <div className="w-1/3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <DayView
              date={selectedDate}
              routine={routines[selectedDate.toISOString().split('T')[0]] || { AM: [], PM: [] }}
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              onProductAdd={handleProductAddClick}
              onProductRemove={handleProductRemoveClick}
            />
          </div>
        </div>

        {/* Product Selector Modal */}
        {showProductSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {productToSchedule ? `Set Frequency for ${productToSchedule.name}` : `Add Product to ${selectedTimeSlot} Routine`}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2">
                  <Plus className="w-6 h-6 transform rotate-45" />
                </button>
              </div>
              
              {!productToSchedule ? (
                // Step 1: Product Selection
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {myUserProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-peach-300 hover:bg-peach-50 transition-colors flex items-center space-x-3"
                    >
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{product.brand}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                // Step 2: Frequency Selection
                <div>
                  <div className="flex items-center space-x-4 p-3 mb-4 bg-cream-100 rounded-lg">
                    <img src={productToSchedule.imageUrl} alt={productToSchedule.name} className="w-12 h-12 object-cover rounded-md" />
                    <div>
                      <div className="font-bold text-gray-900">{productToSchedule.name}</div>
                      <div className="text-sm text-gray-600">{productToSchedule.brand}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button onClick={() => setFrequency('daily')} className={`btn ${frequency === 'daily' ? 'btn-primary' : 'btn-secondary'}`}>Every Day</button>
                    <button onClick={() => setFrequency('alternate')} className={`btn ${frequency === 'alternate' ? 'btn-primary' : 'btn-secondary'}`}>Every Other Day</button>
                    <button onClick={() => setFrequency('weekly')} className={`btn ${frequency === 'weekly' ? 'btn-primary' : 'btn-secondary'}`}>Specific Days</button>
                    <button onClick={() => setFrequency('custom')} className={`btn ${frequency === 'custom' ? 'btn-primary' : 'btn-secondary'}`}>Custom Interval</button>
                  </div>
                  
                  {frequency === 'weekly' && (
                    <div className="flex justify-between p-2 bg-gray-100 rounded-lg">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <button
                          key={index}
                          onClick={() => handleWeekdaySelect(index)}
                          className={`w-8 h-8 rounded-full font-medium text-sm transition-colors ${
                            selectedWeekdays.includes(index) ? 'bg-peach-500 text-white' : 'hover:bg-peach-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}

                  {frequency === 'custom' && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg">
                      <span className="text-gray-700">Every</span>
                      <input
                        type="number"
                        value={customDays}
                        onChange={(e) => setCustomDays(parseInt(e.target.value, 10) || 1)}
                        className="w-16 p-1 text-center border border-gray-300 rounded-md"
                      />
                      <span className="text-gray-700">days</span>
                    </div>
                  )}

                  <div className="mt-6 flex space-x-3">
                    <button onClick={() => setProductToSchedule(null)} className="flex-1 btn-secondary">Back</button>
                    <button onClick={handleConfirmSchedule} className="flex-1 btn-primary">Add to Calendar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Deletion Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
              <p className="text-sm text-gray-600 mb-6">
                Do you want to remove <strong>{productToDelete.product.name}</strong> from your routine just for today, or for all future dates this month?
              </p>
              <div className="space-y-3">
                <button onClick={() => confirmProductRemove(false)} className="w-full btn-secondary">
                  Just for Today
                </button>
                <button onClick={() => confirmProductRemove(true)} className="w-full btn-primary">
                  Today & All Future Days
                </button>
                <button onClick={() => setProductToDelete(null)} className="w-full text-sm text-gray-600 hover:text-gray-800 py-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}