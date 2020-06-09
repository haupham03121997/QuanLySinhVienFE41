var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType: 'json'

}

//Dùng thư viện axios gửi thông tin yêu cầu backend trả duwxl iệu
var loadDanhSachSinhVien = function() {
    var promise = axios(objectAjax);
    promise.then(function(res) {
        var contentTable = '';
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
            // Mỗi lần duyệt lấy ra dữ liêu jcaur  1 sinh viên 
            var sinhVien = res.data[i];
            contentTable += `
        
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td> 
                <td>${sinhVien.DiemHoa}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button></td>
                <td><button class="btn btn-primary" onclick="suaSinhVien('${sinhVien.MaSV}')">Sửa</button></td>      
            </tr>
        `

        }
        document.querySelector('#tblSinhVien').innerHTML = contentTable;


    }).catch(function(err) {
        console.log(err);
    });
}

var suaSinhVien = function(MaSV) {
    console.log(123);
    // var objectAjax = {
    //     url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${MaSV} `,
    //     method :'get',
    // }
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${MaSV} `,
        method: 'get',
    }).then(function(res) {
        console.log(res.data);
        var sinhVien = res.data;
        document.querySelector('#MaSV').value = sinhVien.MaSV;
        document.querySelector('#HoTen').value = sinhVien.HoTen;
        document.querySelector('#Email').value = sinhVien.Email;
        document.querySelector('#SoDT').value = sinhVien.SoDT;
        document.querySelector('#CMND').value = sinhVien.CMND;
        document.querySelector('#DiemToan').value = sinhVien.DiemToan;
        document.querySelector('#DiemLy').value = sinhVien.DiemLy;
        document.querySelector('#DiemHoa').value = sinhVien.DiemHoa;

        // Dom đến input set giá trị
    }).catch(function(err) {
        console.log(err.response.data);
    });
}

var xoaSinhVien = function(MaSV) {
        var objectAjax = {
                url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
                method: 'DELETE',

            }
            // Gọi API xóa sinh viên
        axios(objectAjax).then(function(res) {
            console.log(res.data);
            // confirm("Bạn Chắc Chắn Muốn Xóa");
            loadDanhSachSinhVien();

            // window.location.reload;
        }).catch(function(err) {
            console.log(err.response.data);
            // window.location.reload;
            loadDanhSachSinhVien();

        });
    }
    //-----------------------------------Chức năng của sinh viên------------------

document.querySelector('#btnThemSV').onclick = function() {
    var sv = new SinhVien();
    sv.MaSV = document.querySelector('#MaSV').value;
    sv.HoTen = document.querySelector('#HoTen').value;
    sv.Email = document.querySelector('#Email').value;
    sv.SoDT = document.querySelector('#SoDT').value;
    sv.CMND = document.querySelector('#CMND').value;
    sv.DiemToan = document.querySelector('#DiemToan').value;
    sv.DiemLy = document.querySelector('#DiemLy').value;
    sv.DiemHoa = document.querySelector('#DiemHoa').value;
    var objectAjax = {
            url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
            method: 'POST',
            data: sv // sv là dữ liệu đưa về backend xử lý vì cậy cần phải  
        }
        //Dùng axios đưa dữ liệu về BE
    axios(objectAjax).then(function(res) {
        console.log(res.data);
        //Gọi lại phương  thức load 

        loadDanhSachSinhVien();
        alert('Thêm Sinh Viên Thành Công!');

    }).catch(function(err) {
        console.log(err.response.data);
        loadDanhSachSinhVien();

    })

    //gọi phương thức reload trang
    // window.location.reload();
}

// Chức năng cập nhật dữ liệu 
document.querySelector('#btnCapNhatSV').onclick = function() {

    // Lấy thông tin nhập liệu từ người dùng
    var sv = new SinhVien();
    sv.MaSV = document.querySelector('#MaSV').value;
    sv.HoTen = document.querySelector('#HoTen').value;
    sv.Email = document.querySelector('#Email').value;
    sv.SoDT = document.querySelector('#SoDT').value;
    sv.CMND = document.querySelector('#CMND').value;
    sv.DiemToan = document.querySelector('#DiemToan').value;
    sv.DiemLy = document.querySelector('#DiemLy').value;
    sv.DiemHoa = document.querySelector('#DiemHoa').value;
    console.log(sv);
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien ',
        method: 'PUT',
        data: sv

    }).then(function(res) {
        console.log(res.data);
        alert('Cập Nhật Thành Công!')
        loadDanhSachSinhVien();
    }).catch(function(err) {
        console.log(err.response.data);
        loadDanhSachSinhVien();
    });
}
loadDanhSachSinhVien();