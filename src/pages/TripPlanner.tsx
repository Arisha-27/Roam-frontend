import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [duration, setDuration] = useState([3]);
  const [theme, setTheme] = useState("");
  const [activities, setActivities] = useState("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !departureDate || !theme) {
      toast.error("Please fill in all required fields");
      return;
    }
    setShowItinerary(true);
    toast.success("Generating your itinerary...");
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'll help you modify your itinerary. What specific changes would you like to make?" 
      }]);
    }, 1000);
    setChatInput("");
  };

  if (showItinerary) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Itinerary Display */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{duration[0]} Days Trip to {destination}</h1>
                  <p className="text-muted-foreground">
                    {departureDate && format(departureDate, "MMM dd, yyyy")} - {returnDate && format(returnDate, "MMM dd, yyyy")}
                  </p>
                </div>

                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Your Itinerary</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((day) => (
                      <div key={day} className="border-l-4 border-primary pl-4">
                        <h3 className="font-bold text-lg mb-2">Day {day}</h3>
                        <p className="text-muted-foreground">
                          Exploring popular attractions and {activities || "local experiences"}.
                          Morning visit to famous landmarks, afternoon cultural experiences, evening at local restaurants.
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Travel Packages */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Choose Your Package</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {["Budget", "Standard", "Luxury"].map((pkg) => (
                      <Card key={pkg} className="p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold mb-2">{pkg}</h3>
                        <p className="text-3xl font-bold text-primary mb-4">
                          ${pkg === "Budget" ? "500" : pkg === "Standard" ? "1,200" : "2,500"}
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                          <li>✓ Accommodation</li>
                          <li>✓ Local Transport</li>
                          <li>✓ {pkg === "Luxury" ? "Premium" : "Standard"} Activities</li>
                        </ul>
                        <Button className="w-full">Select Package</Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chatbot Sidebar */}
              <div className="md:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Modify Your Trip</h3>
                  <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "p-3 rounded-lg",
                          msg.role === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-card mr-4"
                        )}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me to modify your trip..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                    />
                    <Button size="icon" onClick={sendChatMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 bg-soft-gradient">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tell us your travel preferences</h1>
            <p className="text-muted-foreground text-lg">
              Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label htmlFor="destination" className="text-lg font-semibold mb-2 block">
                  What is destination of choice?
                </Label>
                <Input
                  id="destination"
                  placeholder="New York"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    When are you planning to travel?
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "PPP") : "Select Date..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    Return Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : "Select Date..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  How many days are you planning to travel?
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={14}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-primary">
                    {duration[0]} {duration[0] === 1 ? "Day" : "Days"}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-2 block">
                  Select Your Travel Theme:
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Couple Getaway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="couple">Couple Getaway</SelectItem>
                    <SelectItem value="adventure">Adventure Trip</SelectItem>
                    <SelectItem value="family">Family Vacation</SelectItem>
                    <SelectItem value="solo">Solo Travel</SelectItem>
                    <SelectItem value="cultural">Cultural Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="activities" className="text-lg font-semibold mb-2 block">
                  What activities do you enjoy?
                </Label>
                <Textarea
                  id="activities"
                  placeholder="Relaxing on the beach, exploring historical sites..."
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  rows={4}
                  className="text-lg"
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg py-6 rounded-full">
                Generate My Trip
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripPlanner;
