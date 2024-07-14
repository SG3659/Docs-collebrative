import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../HomeMenu/SideBar";

const HomeHeader = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-white flex justify-between items-center p-2 w-full z-20 fixed top-0  ">
        <div className="flex items-center">
          <div className=" p-2 hover:rounded-full hover:bg-[#e8e9eb] hover:cursor-pointer">
            <IoMdMenu fontSize={25} />
            {/* <SideBar /> */}
          </div>
          <div className="p-1">
            <img
              className="w-8 h-10 "
              src="data:image/jpeg;base64,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"
            />
          </div>
          <div>
            <h1 className="font-light text-lg font-google ">Docs</h1>
          </div>
        </div>
        <div className=" ">
          <div
            onClick={() => setToggle(!toggle)}
            className=" flex items-center gap-1 p-1 cursor-pointer  rounded-full bg-gray-300"
          >
            <img
              className=" w-8 h-8 rounded-2xl "
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACUCAMAAADS8YkpAAABUFBMVEVRmeXuuYo7T1z///9vQTLv7+9KMiv09PT6+vr39/fXp3z1v47yvIz5wpDwuogzk+z+T23LtK1Rn/CUZk1IleXRonnEl3EpAAA/JiLps4Hwz7SsqKg8kOReLya7jmpmOi7ft5punNlEIgjjsINLR1VUb5CgeVxwPCZqm9L7voKdcVVenuVKLh+cvuh7UD1uqeji5upLYHRTOS3Q3/GTbVaFXUpnRDdTQ0JJKypaPjpSkNRcNCx+o9OxrLOjpLXCsLHUtaR5X2Nkf7Bdh79rUVRrX3P1m4Hxjnz9fHq0y+vMqI8QP1dQe6rHxMM3EgBwUkN/bGgvGRt4e4eEs+k9RmEfAA5MHgBDHRw8KRIzGRNEapREOTSTpcdsa4NuTEh1YFaXl5xxNhBuMDSgS0ziUWTIUlz6ZXJwfqJNTEw4RUmKcWGQhoFsZWe2lXgzV3alhnJdS8VLAAAQU0lEQVR4nM2c/X/SyBaHE6AEkglVSCJ7F5LW2KDQ0hRKWkCva1FXtC4qu3fXVt11d12tq9f//7c7L0nIy+QN8Ha/H19KSWYeDmfOOTOThCkRlTki+6X/lffN/NMfikHVI4Xe7BWLvd7sUFWMYt1/3rVv86jZsq+Xsr/TAAKzQVTKY5Xsl+RVniOvyp43S0e+Tus9Q1ENrLbR9gr/TlVVRdahBFEURCUAXK+XInoJIXD2ywBvOYm39PSa30aqmCRBAACwSIIR+GJe3knkLa/I+8xnoueqyKYXYAcBA3/6yvYtPz332UfJggsNzFp+4POnX5OXM/svvP3VDSETLgL2W7j+ol/6arz5/nz0466ns8OMtBj40Au8++Nor1/mVuXlaLzctNOYeG0zYEF2YABUT5TYPZo0OnsbHOf9FuOIGPrHsF95zilPOxLDnF1f+O4MZPUGAiwodQ/whJGk/b6XrORFCAbaAG85TzsYtmTONxmog92FdcUlrIslsjMX+PopanZzzoUsuUH16lj7Lj7clJFQu6MbDu8yvuvKM+p2D1C7sPVpqbQ2XnNOcJmRi7uU71KAd28wBFia90tr4u13CC3DnDru29OX8t0FsN4jwLvnI7vtRqdfXgvvVHJwqzs27/OMeSIskX9OmvrF4YXEe5l5/eMNDVVz3nAbrNrDrW6tiguBbY+4vuCFwCaXxMv5q7hAWVnu70uL9qr2cKvLq3kDEtB7uK3/eHiZBoxs9FrW4YuvJ0sL10XqHBHc2SpjzZFgYANfP6t6epCYft6PkCkf22HM0egXwqusgxfwFubd8fKiwMb5EDLUk6Vpg/Fpcn0NsWwBjCuJ3YOqv5PGHrekffcCuA5v5qqMLlEt0nghcHkp3hBudYSnbr01jDYkQbdwwgjyorjGpeT1jLcQLlM9wfadrYUWCgzovMTCEbxlW3b0cF+Fce10UTdWD75EIooQNF4E7E6TfXyliPzGUXAdXn497oAcOIoXAmerJ4ORwcNrCWuJDlACH8nLNKYlen6j2rcv0drAvPXDdbkDjIrjSF5G6lNnSVTePhPN+1xZlztAA1sxvAwp11LwmvtUXML7k74ud4C8cJ4RxcvAWVI6Xm5Oc17XH9bmDnDAHcbwMtLcpIy3UBmUn9OtS3jrMwovQKtjcWbHB4T9SDSeB+sHH/DtfPJ6X5kaGlze54HoCyCILsuKwvO6SDe9KOo8rygyjxb9fJ9KUJ7bE066GtPkeoceGggvrB/qqqdHIABdHVi9cW88Pir2uip1KKpWDx7RGxaH1kDVgeeLEPif/PVvyML9pHwcNdYwL8zHdXnRHdCVwfH4aDgcHqF/hkNaHQ+D7HCowTfHY3TI8UBhXWIAfvLOhyi883KCfWl5zRWyr77oDNL2LGi1Gl7rPZxZM0rsAPrM6tbw+vChNRxbvfOB6gKLx8XzOF7oEfG8Md5AeIsOkgAMa6i9tAxZR5Ef/tF56qQZwN+TA1heMWY/W8Oi4awMibP6USwv07HTRgRvjDcg3l/qPZtX0Gdarzjj0Vo0sO0N6CHCe4Qg8NZ4qDlfhGi8TOCVOnG80bEBq3rj5cDuWh/0hpYqZs91oqhaR70BAQZyEi/TmPtWJXzx14y1LsNsnl23QwBQx8OCvNQKGhDlwnBMwgxgrRujeBtJkpn3TNx9+S0yU9hn3r7btr9IoB73ll4zEZXesR0WBeXXu7el+G7nEfmY68d/0M5VtlJzw5mywqxIkBXH2HLtG/ZqJ/577VN5uX7sadLNrQrQu+r6qh3Mq3Z1UNm6Gdvz/gaVdxr7KUdbFZbVx8aaeY0eDIe3thKCMI03LrPBD3nnFmxe7w1ona4w46iNIS97607coJP2y2He+MzGSLh13eqGUhgQdIVfkhg6mKbjn2J9Ec7mXF5n+snFekPj9i3MWygEeYHeHmtWLamKt7c6Q7yahXlv3Y63FudMk518QVlu8GrzDu4KmoMHgR5npI6JszAAujEYHg8PlcBKFuC1Auat3NmMNddePpDfNuJjyubVCuFtyoEe1fEbiGsVY1YlIO1wPLQsq3hsKb7PBfhml/BejeVlOoF8nBAcHF6221QCMLUxBIHEs8hwDHP3eLhbPC4Wi8fjseEFBkqzy6bhlaYB+8anNpd3EOId9LQj683wKJpXGDR/HrYVXudlY1Af+1YLleYgHe+87OVNSG0L3lqQFxjFNxYE7kUuS4jqz5YKRFTIwfmQ3rW8I0Bp1kAaXpLkXF4zwbweXjXAy3fxeDvno8abODtkF4WRIMrsMrzSHqkg8f5F2eyktm+AF7pgd3h+XIi+DgLACZDvtfdnNTUvY3rW+xLq3jheOJxUQ40LvxFlPJKQmhcmZW6R3+KnFX7e0LgCAaNlUHr7oqTs8nJJB8fyrqAM9mU2TZc3Prf9Q3jJPgziLSW6wz+BV9p3eJOmbf8MXrIijHgTcjHm/bdg87bXuD7JCm2bV/h3Cl60dgLzBTdPPJSRth37rpVXdHgr28k2wxNPBs3bknkZaatCeAcJvACvjywUzzsgvJWtZFyGQfM4JrE0I7IL9poWfymBLgelx/JaGuZNKNcd9THvXhpepnEXGhjUtGbseNOVoGJ5hSbmrdxNhSDt4XonqdZxjr7DVqB9m7HbbwAtTHtxI8sgjMsj3gq4k5IA1jxMwrzYczTz6rsK5I0NaAIC9uHG8qqQt/LdK/p2VJhg34S8qYYbOb7z6l5Li5z4AFFkdZ3Hl/zK6I+iqryus2LkMptoaK17rxJWd7z99/NMKdVws0+QHrQK3Yi+BbldG3SJDlVZPbR/HtTacsTOBtsttB7Er575+59yTHIt6dVOq6Dx1B0ipatpBVdawfOioHUV2vRZkAuF1usMvTf2NhjaRny03kNeikMAvt30AgalNdsUT4buUGi9z9C7NN9gyqndB+mkVSgMwks80LgxtLaJQ2fpA2jfkyy8nay8E9R3cOEXfa8BOs3SQp8guAArKui3kyy8jMmkKM48Gt2HDlEL5AAw0OxvXSOyajIr1yz7le0p2iBgYL0G3eF+wnZAANhk+lnclxnBAAE92GcpUWlioJqsf0NUESv4L5Eu1/D7Y//3IkDvheEhE2+jn5GXeY1NpXpDqkicV+GVrX9RJfNqF7uwhxcIKj4rS3hAk04mUzhjqpM3BHgxRwc6Mq8m67Nrf+epOp/pPDqmuRiogCW4hUnkbncEb7pqZ6H7ZPDUdMdY2FDNGrp5ZVim4T69VlTEWhN9SudDijpxkcKbTO6AeFNWO65et+yxZZDiFrDou+6iywvrL381S0Ha0tN6HS1B2UexeNvQGBPrZsoWDArATMpqx9XkrR2eml202S4IKvYPAeizerG+++Jbv357Ua/XZ7rtrio8Htac3abdRmuUyR2W4a3eby1yQFtV29hw0ID4arLiD9f8+uEluWIN8Pg4coIbmlvZcGGFxuxnO4OpnjgGxnkBpwUNbQcIfK9IVw+WzABFW/cEB/f91+dlRlYwcRW0NvJL8bBOxbWvAGuHEl7Lytr3MvIZ2OY1yMjD19CPf//99zH8H/7XxLg9MsqMcYj3JKN5lxPOcQH7kijF1+vjP/68cuXKn+/evYP/XXn3x7het+vPkH0z5uKlVT0JOYRdsokqpvXqzz9I0MXFWIA3Sym5ksIGtncJwMO/ArxXHto5TVmTeTOPN5SUg0NOq7np2Q/8yK1uaqHhli0VO0o92/QCwyHX9QO7xa3w8JGD/Ncjx7iwRPbhwpPfRl8nF6PtzPmCAN8LekTBXWIXwMOH3z969Oj7h6x7SR9gQ877ZolucfxdhhfX7X4Dt70zSrxZ7C0eg8GhlWleseCdZ653bE3ehIBdC4u6cTg4NNwKDjixzONDWaZtPt6s9aSjUwzsIdAMUhMLkA5OgeDftvMLIxQblswUmev1ELDPwjys10TdjQSwrEA3S/PhTLFsYluFF86VA8DNrqEqiidwaTVFUY3QXP/t0nl4Jd6wDxdoqxDu77rkn9bb5fMamm8u6b8Mut8llOiS1bq/VGSwebOuPwS1E/SJJNqME/iAJDPj+k5IkwetDMRv759knAH5cTuQd7mE4ajKnNwP1cORxn29Ci3eMsy4PknVSWjc0WnvreC5WGg9Ndv6L13VyaG3/OlSaLuD98zKs4nGFPImXQqTQtL2Fq+2a10tvCiJppiFbs1QHi9RuIaEeVcbcFjbj3mel2XE3Gy60GhtsjBowyQi8/zj7ZV7kTp9yJt2fyiRl8fMENrZxRi00c6L/c46ePdNLvV+YWxDHcjrgPG6HvwBvbkO3r30+7HxDW1v6RhYXlC7oPi3sv44xY52kqbp97uTeCvQmM5376GWyQtdr2ytztvB+8cb5sojF/HCQlfH/kuoZdeyaMsQ7cCvzrtfxrzllR3Y5sXCTos4ZezBzlbHGniR+yJeboUSLcy7mLT5Xq2D17Sv79tYsSE6L7tuXgZdU4vuF4m+Qy8NK1I6XqzlO5q794uYyRf70FStVvdHN5FepeB9hY+8OYJnLdUbuSCRXI+4REoenZwefLi4+HgLKwkXApMDb324yB2cnixTqXmun8xSo1WZ0WhycJC7uMjlck++ZLxcSnwGz4KnHhxMJqMsFRt5uInNmz5CVDuTM8ias7UcLxZkPpt0UhNLfQ8vl3LEVUenOzmf/s7K+8l3+s5pyhkHrHW894tMU9EyAVioZxl5hRvBFnZSeYVkPyaE3C9SSlMEj3Y+hHBzn7Ld7i3KT0JNfNhJnjLDmWbJe79IYlEJPWHhtV59zmRg8SOliYtcoldIzg0jDq+Z8AFP/0uDRQ6R5dpqQY5o5SDmrmmsfuD+i/gcNwo77sLA6S+wBRWaeYl24kxM7jH08pbM6BBcnVxQXcFW+hsNwZfoVi4uTqOBN81ykDcf9VQCZnQaRwtjcNpndYmfY9s5P40ad415KXw/b1TOGB3E9gL1IdWNskD4HI4Nfu1EpGmpz7m87vOuylQDVyeJuDkUJBKBhRjfXYi6x9WYLx5/lXC/aXWSohOoZ3pCWBPlT8mt0IHRZZPU52tQYnBK3NyT3GedjbplD4gs/yy5DayjsEvg2Eu7/zh8F1FaXET84YusC2FkQRR05WMuyXUXCgF3TDrvRjmwEpHWGRzii2dflG8gn02NLpYRgf75y6cMtLmQSzTwrXrU562UfNOVjLi2fv3yWdbJzaW88uVjOq+NAZY6+UjeDd/mwHZ82I3UE4+WauDCG4clzs9LwoTN67sJOapi+D/I4w1wsCE+lxeOM/S0Mfu6sUXhPjq7PNzcmWNhaW6iZ8Fykc9bcVevTy8RN5c7dZy3n/C8FWe1cnSpuLkcMbA0TXz+jp2WH1wy7wPsvPMUz+8z0d0QkyVjw9r0YYIup+ZS8HJ96DaXTIvUkfCkIt4fcNiYSpcZGxydVaeLxEB/Poz9mNL89BJD70Kvyp7HqFKfD+N8DO63y2aFSe43EzOlen4fl6ZI/7p6sZH++X35vHnZwAemPdDS8XKXDHxgZny+cvlSgSFu1udXc08vDxjhRj3fsxylS/RhM7/AKPmp4p7/eznAF/ZQy/uInC/+fy0GeNiHmTFeAAAAAElFTkSuQmCC"
            />
            <p>{user?.name}</p>
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolut top-20 right-0 mx-4 my-2 min-w-[140px] bg-gray-200 rounded-3xl z-10 `}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              <li className="font-thin italic text-sm">{user?.email}</li>
              <li
                className="cursor-pointer font-semibold "
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default HomeHeader;
