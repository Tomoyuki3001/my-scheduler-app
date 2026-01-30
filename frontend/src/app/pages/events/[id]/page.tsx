"use client";

export default function page() {
  return (
    <div className="max-w-4xl my-10 mx-auto bg-white min-h-screen shadow-sm pb-10">

      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" alt="Event Header" className="w-full h-full object-cover" />
        <span className="absolute bottom-4 left-6 bg-white text-slate-900 px-3 py-1 text-xs font-bold rounded uppercase">Paid</span>
      </div>

      <div className="px-6 py-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-rose-500 font-bold text-sm tracking-wide">7th Mar, 2018 | 6:30 AM</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 leading-tight">
              Founder Institute Dhaka Graduate Showcase & Networking Event
            </h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 text-slate-400">
              <span className="hover:text-blue-600 cursor-pointer">f</span>
              <span className="hover:text-blue-400 cursor-pointer">t</span>
              <span className="hover:text-blue-700 cursor-pointer">in</span>
            </div>
            <button className="border border-slate-200 text-slate-500 px-4 py-2 rounded-lg text-sm hover:bg-slate-50">Invite via email</button>
          </div>
        </div>

        <div className="flex items-center mt-6 -space-x-2">
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?u=1" />
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?u=2" />
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?u=3" />
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?u=4" />
          <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xs font-bold">+19</div>
        </div>

        <div className="mt-8 text-slate-500 leading-relaxed max-w-2xl">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. <span className="text-blue-500 cursor-pointer font-medium">See more...</span>
        </div>

        <div className="mt-10 border-b border-slate-100 flex gap-8">
          <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-bold text-sm">Timeline</button>
          <button className="pb-4 text-slate-400 hover:text-slate-600 font-medium text-sm">Speaker</button>
          <button className="pb-4 text-slate-400 hover:text-slate-600 font-medium text-sm">Sponsor</button>
          <button className="pb-4 text-slate-400 hover:text-slate-600 font-medium text-sm">Additional details</button>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Event Schedules</h3>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-blue-100 bg-white shadow shrink-0 text-blue-600 text-[10px] font-bold z-10">9:00 AM</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <h4 className="font-bold text-blue-600">Opening ceremony</h4>
                <div className="text-slate-400 text-xs mt-1">By Gleb Kuznetsov · 9:00 AM - 9:30 AM</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-rose-100 bg-white shadow shrink-0 text-rose-500 text-[10px] font-bold z-10">9:30 AM</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <h4 className="font-bold text-rose-500">Principles of User Interface design</h4>
                <div className="text-slate-400 text-xs mt-1">By Eddie Lobanovskiy · 9:30 AM - 10:45 AM</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-orange-100 bg-white shadow shrink-0 text-orange-500 text-[10px] font-bold z-10">10:45 AM</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <h4 className="font-bold text-orange-500">Case Study: scratch to final</h4>
                <div className="text-slate-400 text-xs mt-1">By Zhenya Rynzhuk · 10:45 AM - 12:10 PM</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
