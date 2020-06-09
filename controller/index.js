// console.log(axios);

//Tạo ra dối tượng chưa 3 thuộc tính cần thiết để giao tiếp với backend
var objectAjax = {
    url: '../data/DanhSachNguoiDung.json', //Đường đẫn đén file chứa dữ liệu hoặc api backend
    method: 'GET', // Giao thúc back end cung cấp với url
    responseType: 'json',
}



// Dùng thư viện để đọc file hoặc api thừ backend

var promise = axios(objectAjax);

promise.then(function(res) {
    //hàm sử lý thành công
    // console.log(response)
    var noiDungTable = '';
    for (var i = 0; i < res.data.length; i++) {
        var nguoiDung = res.data[i];
        noiDungTable += `
            <tr>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td> 
                <td>${nguoiDung.soDT}</td>
            </tr>
        `
    };

    //Dom đén table tbody chèn các thẻ tr vừa tạo vào
    document.querySelector('#tblNguoiDung').innerHTML = noiDungTable;

}).catch(function(error) {
    //Hàm xử lý khi request thất bại
    console.log(error);

});