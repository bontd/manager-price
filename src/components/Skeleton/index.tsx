import { Skeleton as SkeletonAntd } from 'antd';

const Skeleton = ({rows = 1, columns = 1}: {rows?: number, columns?: number}) => {
    return (
        <div className="w-full flex flex-wrap">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="w-full flex flex-col gap-4">
              {columns > 1 ? (
                <div className="w-full flex flex-wrap">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <SkeletonAntd
                      key={colIndex}
                      active
                      className="flex-1"
                      style={{ width: `${100 / columns}%` }}
                    />
                  ))}
                </div>
              ) : (
                <SkeletonAntd key={rowIndex} active className="w-full" />
              )}
            </div>
          ))}
        </div>
    );
}

export default Skeleton;