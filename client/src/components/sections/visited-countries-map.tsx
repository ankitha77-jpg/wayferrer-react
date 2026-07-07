const regionStats = [
  { name: "Africa", count: 36, total: 54 },
  { name: "Australia & Oceania", count: 1, total: 14 },
  { name: "Central America", count: 6, total: 20 },
  { name: "Central Asia", count: 6, total: 6 },
  { name: "East & Southeast Asia", count: 12, total: 16 },
  { name: "Europe", count: 29, total: 44 },
  { name: "Middle East", count: 16, total: 18 },
  { name: "North America", count: 2, total: 3 },
  { name: "South America", count: 5, total: 12 },
  { name: "South Asia", count: 6, total: 8 },
];

export default function VisitedCountriesMap() {
  const totalCountries = regionStats.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="relative">
      {/* Main counter badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-3">
          <span className="text-3xl font-bold">{totalCountries}</span>
          <span className="text-sm font-medium">Countries Explored</span>
        </div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border border-white/50">
        <div className="relative w-full max-w-6xl mx-auto mt-4">
          <div className="rounded-2xl overflow-hidden shadow-inner" style={{ position: 'relative', padding: '0 0 67% 0', height: 0, overflow: 'hidden' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src="//www.fla-shop.com/visited-countries/embed/?st=AE%2CAF%2CAL%2CAM%2CAO%2CAR%2CAT%2CAZ%2CBA%2CBG%2CBI%2CBJ%2CBT%2CBW%2CBZ%2CCD%2CCH%2CCM%2CCO%2CCR%2CCZ%2CDE%2CDJ%2CDK%2CDZ%2CEC%2CEE%2CEG%2CER%2CET%2CFI%2CFR%2CGA%2CGB%2CGE%2CGH%2CGT%2CGY%2CHN%2CHU%2CID%2CIN%2CIQ%2CIR%2CIS%2CIT%2CJO%2CJP%2CKE%2CKG%2CKH%2CKM%2CKW%2CKZ%2CLA%2CLB%2CLI%2CLK%2CLS%2CLT%2CLV%2CLY%2CMA%2CME%2CMG%2CMK%2CMM%2CMN%2CMU%2CMV%2CMW%2CMX%2CMY%2CMZ%2CNA%2CNI%2CNL%2CNO%2CNP%2CNZ%2COM%2CPA%2CPE%2CPH%2CPL%2CQA%2CRO%2CRS%2CRW%2CSA%2CSC%2CSD%2CSE%2CSG%2CSI%2CSK%2CSS%2CST%2CSY%2CSZ%2CTG%2CTH%2CTJ%2CTM%2CTR%2CTW%2CTZ%2CUG%2CUS%2CUZ%2CVA%2CVN%2CYE%2CZA%2CZM%2CZW&vc=1ca032&uc=ebebeb&hc=40bfa6&bc=ffffff"
              frameBorder="0"
              scrolling="no"
              title="Interactive map of visited countries"
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {regionStats.map((region) => {
              const percentage = Math.round((region.count / region.total) * 100);
              return (
                <div
                  key={region.name}
                  className="group relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-300 cursor-default"
                >
                  <span className="text-xs text-center text-gray-600 leading-tight font-medium">
                    {region.name}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {region.count}<span className="text-gray-400 font-normal">/{region.total}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
