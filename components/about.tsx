export default function About() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-blue-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-fade-in-left order-2 md:order-1 hidden md:block">
            <img
              src="/expert-mentorship-session-with-career-advisor-and-.jpg"
              alt="Expert mentorship"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="animate-fade-in-right order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About Careergize</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Careergize, we believe every student and business deserves expert guidance to achieve their goals. With
              years of experience in education and digital solutions, we combine personalized mentorship with
              cutting-edge technology to transform careers and accelerate growth.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Whether you're navigating college admissions or building your digital presence, our team of experts is
              dedicated to helping you unlock your full potential.
            </p>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="animate-slide-in animation-delay-100">
                <div className="text-3xl font-bold text-primary">10+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="animate-slide-in animation-delay-200">
                <div className="text-3xl font-bold text-accent">100+</div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
