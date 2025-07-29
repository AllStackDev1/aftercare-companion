import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  BookOpen, 
  Filter,
  ArrowRight,
  Heart,
  Activity,
  Shield
} from 'lucide-react';
import { availableBrochures, BrochureData } from '@/data/brochureData';

interface BrochureDashboardProps {
  onSelectBrochure: (brochure: BrochureData) => void;
}

const categoryIcons = {
  'Gynecological Surgery': Heart,
  'Minimally Invasive Surgery': Activity,
  'Cardiac Surgery': Heart,
  'General Surgery': Shield,
};

const categoryColors = {
  'Gynecological Surgery': 'bg-pink-100 text-pink-800',
  'Minimally Invasive Surgery': 'bg-blue-100 text-blue-800',
  'Cardiac Surgery': 'bg-red-100 text-red-800',
  'General Surgery': 'bg-green-100 text-green-800',
};

export const BrochureDashboard = ({ onSelectBrochure }: BrochureDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(availableBrochures.map(b => b.category))];

  const filteredBrochures = availableBrochures.filter(brochure => {
    const matchesSearch = brochure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brochure.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brochure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Medical Care Guides</h1>
        <p className="text-muted-foreground">
          Access comprehensive recovery guides and medical care instructions
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search medical guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Guides</p>
                <p className="text-2xl font-bold">{availableBrochures.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <Filter className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Showing</p>
                <p className="text-2xl font-bold">{filteredBrochures.length}</p>
              </div>
              <Search className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brochures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrochures.map((brochure) => {
          const CategoryIcon = categoryIcons[brochure.category as keyof typeof categoryIcons] || BookOpen;
          const categoryColor = categoryColors[brochure.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
          
          return (
            <Card key={brochure.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge className={`text-xs ${categoryColor}`}>
                      {brochure.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {brochure.estimatedReadTime}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{brochure.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {brochure.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Version {brochure.version} • {brochure.sections.length} sections
                  </div>
                </div>
                
                <Button 
                  onClick={() => onSelectBrochure(brochure)}
                  className="w-full group-hover:bg-primary/90 transition-colors"
                >
                  View Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredBrochures.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No guides found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
    </div>
  );
};