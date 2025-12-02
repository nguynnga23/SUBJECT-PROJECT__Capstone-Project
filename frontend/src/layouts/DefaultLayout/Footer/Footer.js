import { new_logo_white, bg_footer } from "../../../assets/index.js";

export default function Footer() {
  return (
    <footer
      className="text-white py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg_footer})` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={new_logo_white} alt="IUH Logo" className="w-[200px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold mb-2 ">
              <i>ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</i>
            </h3>

            <p className="text-sm">
              <span className="font-semibold">Địa chỉ:</span> Số 12 Nguyễn Văn
              Bảo, P. Hạnh Thông, Q. Gò Vấp, TP. Hồ Chí Minh
            </p>

            <p className="mt-2 text-sm">
              <span className="font-semibold">ĐT:</span> 0283 8940 390
              <br />
              <span className="font-semibold">Tuyển sinh:</span> 028 3995 1932 -
              028 3895 5858 - 028 3985 1917
            </p>

            <p className="mt-2 text-sm">
              <span className="font-semibold">Email:</span> dhcn@iuh.edu.vn
            </p>

            <iframe
              className="w-full h-52 mt-4 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.026387550366!2d106.68103597585163!3d10.811998589342448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292b55e123%3A0xa566a59e26544f0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBOZ2hp4bq_biBUcC4gSMOgIENow60gTWluaCBDaXR5!5e0!3m2!1sen!2s!4v1700000000000"
              loading="lazy"
            ></iframe>
          </div>

          <div className="text-sm">
            <h3 className="font-bold mb-3 text-[#8ED8F8]">
              Các cơ sở và phân hiệu
            </h3>

            <FooterItem
              title="NGUYỄN VĂN DUNG"
              address="Số 10 Nguyễn Văn Dung, Phường An Nhơn, TP.HCM"
            />

            <FooterItem
              title="TRUNG TÂM CUNG ỨNG DỊCH VỤ VH-TT"
              address="Số 5A Nguyễn Văn Lượng, An Hội, Gò Vấp, TP.HCM"
            />

            <FooterItem
              title="THANH HÓA"
              address="Phường Quảng Phú, TP. Thanh Hóa"
            />
          </div>

          <div className="text-sm mt-10 md:mt-0">
            <FooterItem
              title="PHẠM VĂN CHIÊU"
              address="Số 20 Đường số 53, An Hội, Gò Vấp, TP.HCM"
            />

            <FooterItem title="NHƠN TRẠCH" address="Xã Phước An, Đồng Nai" />

            <FooterItem
              title="PHÂN HIỆU QUẢNG NGÃI"
              address="Số 938 Quang Trung, Quảng Ngãi"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ title, address }) {
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-[#8ED8F8]">{title}</h4>
      <p className="mt-1">{address} – ĐT: 0283.8940 390</p>
    </div>
  );
}
