import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDoctors } from '@/services/admin/doctorManagement';
import { IDoctor } from '@/types/doctor.interface';
import DoctorCard from '../Consultation/DoctorCard';

const TopRatedDoctors = async () => {
    // Fetch top rated doctors (limit to 3, sorted by rating)
    const result = await getDoctors('limit=3&sortBy=averageRating&sortOrder=desc');
    const doctors: IDoctor[] = result?.data || [];

    return (
        <section className="bg-blue-50/50 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground">Our Top Rated Doctors</h2>
                    <p className="text-muted-foreground mt-4">
                        Access to medical experts from various specialities, ready to provide you with top-notch medical services.
                    </p>
                </div>

                {doctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {doctors.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-12 text-muted-foreground">
                        <p>No doctors available at the moment.</p>
                    </div>
                )}
                
                <div className="text-center mt-12">
                    <Link href="/consultation">
                        <Button size="lg">View All Doctors</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;