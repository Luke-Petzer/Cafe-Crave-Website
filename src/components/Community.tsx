import { DicesIcon, CalendarIcon } from 'lucide-react';
export const Community = () => {
  return <section id="community" className="bg-light py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Community & Events
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-subtext max-w-2xl mx-auto">
            Join us for more than just coffee. At Crave Cafe, we foster
            community through shared experiences and fun activities.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <DicesIcon size={24} className="text-light" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary">
                Board Game Library
              </h3>
            </div>
            <p className="text-subtext mb-6">
              Our extensive collection of board games is free for all customers
              to enjoy. From family classics to modern strategy games, we have
              something for everyone.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" alt="Board game" className="rounded-md h-24 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1606503153255-59d8b2e4739e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" alt="People playing board games" className="rounded-md h-24 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1611371805429-12b7e19b2c87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" alt="Board game pieces" className="rounded-md h-24 w-full object-cover" />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <CalendarIcon size={24} className="text-light" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary">
                Weekly Events
              </h3>
            </div>
            <p className="text-subtext mb-6">
              From trivia nights to live music, our weekly events bring the
              community together in a relaxed and fun atmosphere.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-secondary text-white text-sm px-2 py-1 rounded mr-3 mt-1">
                  MON
                </span>
                <div>
                  <h4 className="font-medium text-primary">Open Mic Night</h4>
                  <p className="text-sm text-subtext">7pm - 9pm</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-secondary text-white text-sm px-2 py-1 rounded mr-3 mt-1">
                  WED
                </span>
                <div>
                  <h4 className="font-medium text-primary">Trivia Challenge</h4>
                  <p className="text-sm text-subtext">6:30pm - 8:30pm</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-secondary text-white text-sm px-2 py-1 rounded mr-3 mt-1">
                  SAT
                </span>
                <div>
                  <h4 className="font-medium text-primary">Family Game Day</h4>
                  <p className="text-sm text-subtext">2pm - 5pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};