import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import passportIllustration from "@/assets/passport-illustration.jpg";
import { Upload, Globe } from "lucide-react";
import { toast } from "sonner";

const PassportScanner = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success("Passport photo uploaded successfully");
      // Simulate processing
      setTimeout(() => {
        setShowResults(true);
        toast.success("Passport scanned! Showing visa-free countries.");
      }, 2000);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowResults(true);
  };

  const visaFreeCountries = [
    { name: "Thailand", region: "Southeast Asia", duration: "30 days visa-free" },
    { name: "Japan", region: "East Asia", duration: "90 days visa-free" },
    { name: "United Kingdom", region: "Europe", duration: "180 days visa-free" },
    { name: "Canada", region: "North America", duration: "6 months visa-free" },
    { name: "Australia", region: "Oceania", duration: "90 days visa-free" },
    { name: "Brazil", region: "South America", duration: "90 days visa-free" },
    { name: "Singapore", region: "Southeast Asia", duration: "30 days visa-free" },
    { name: "UAE", region: "Middle East", duration: "90 days visa-free" },
    { name: "South Korea", region: "East Asia", duration: "90 days visa-free" },
    { name: "Mexico", region: "North America", duration: "180 days visa-free" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Passport Scanner</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your passport or select your country to discover visa-free destinations and visa-on-arrival countries.
            </p>
          </div>

          {!showResults ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Passport */}
              <Card className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-16 h-16 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Upload Passport Photo</h2>
                  <p className="text-muted-foreground mb-6">
                    Take a clear photo of your passport's information page
                  </p>
                  <Label
                    htmlFor="passport-upload"
                    className="cursor-pointer w-full"
                  >
                    <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors">
                      <p className="text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG (MAX. 10MB)
                      </p>
                    </div>
                    <Input
                      id="passport-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </Label>
                  {uploadedFile && (
                    <p className="mt-4 text-sm text-primary">
                      Uploaded: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </Card>

              {/* Select Country */}
              <Card className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Select Your Country</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose your passport country from the dropdown
                  </p>
                  <div className="w-full space-y-4">
                    <Select value={selectedCountry} onValueChange={handleCountrySelect}>
                      <SelectTrigger className="w-full text-lg">
                        <SelectValue placeholder="Select your country..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Visa-Free Countries</h2>
                <p className="text-muted-foreground">
                  Based on your passport, you can visit these countries without a visa
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visaFreeCountries.map((country) => (
                  <Card key={country.name} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{country.name}</h3>
                      <span className="text-2xl">🌍</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{country.region}</p>
                    <p className="text-primary font-semibold">{country.duration}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button onClick={() => setShowResults(false)} variant="outline">
                  Scan Another Passport
                </Button>
              </div>
            </div>
          )}

          <div className="mt-16 text-center">
            <img
              src={passportIllustration}
              alt="Passport illustration"
              className="w-64 h-64 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PassportScanner;
