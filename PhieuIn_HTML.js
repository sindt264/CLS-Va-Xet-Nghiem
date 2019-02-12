var _url = "Handler/6_XetNghiem/PhieuIn.ashx?loai=";
var benhnhan;

var khoa1 = "";
var khoa2 = "";

var dskq;
var tieude;
var nguoiin;
var _nhomin = getParameterByName("nhomin");
var _mabp = getParameterByName("mabp");
var _idcoso = getParameterByName("idcoso");
var _nguoiin = getParameterByName("nguoiin");
var _mabp = getParameterByName("mabp");

$(document).ready(function () {
    phieuin();
    setTimeout(function () {
        window.print();
        window.close();
    }, 200)
    
})




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function phieuin() {
    var D = new Date();
    var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var date = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

    $.ajax({
        url: _url + "dskq",
        data: {
            mabp: _mabp, nhomin: _nhomin
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (Object.keys(data).length < 1) {
                location.reload(true);
            } else {
                dskq = data;
            }
        },
        error: function (xhr, status, err) {
            //bootbox.alert(xhr.responseText);
        }
    });

    $.ajax({
        url: _url + "tieude",
        data: {
            idcoso: _idcoso
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            tieude = data;
        },
        error: function (xhr, status, err) {
            //bootbox.alert(xhr.responseText);
        }
    });



    $.ajax({
        url: _url + "benhnhan",
        data: {
            mabp: _mabp
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            benhnhan = data;
            
        },
        error: function (xhr, status, err) {
            //bootbox.alert(xhr.responseText);
        }
    });



    $.ajax({
        url: _url + "nguoiin",
        data: {
            nguoiin: _nguoiin
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            nguoiin = data;
        },
        error: function (xhr, status, err) {
            //bootbox.alert(xhr.responseText);
        }
    });

    //------------------------------------------------Header----------------------------------------------------//

    var header = "<div id='Header' style='width:100%'>";
    header += "<table border='0' style='width:100%'>" +
        "<tr>" + "<td style='width:65%; text-transform: uppercase;' class='font_c'>" + tieude.TenBV + "</td>" + "<td rowspan='4' style='width:17.5%; text-align:center' class='font_small'>Mã bệnh phẩm<br><img style='width:auto; height:80px' id='imgMABP'/></td>" + "<td rowspan='4' style='width:17.5%; text-align:center' class='font_small'>Mã bệnh nhân<br><img style='width:auto; height:80px' id='imgMABN'/></td></tr>" +
        "<tr>" + "<td class='font_small'>KHOA XÉT NGHIỆM</td>" + "<td  style = 'width:15%'></td>" + "<td style = 'width:15%'></td>" + "</tr>" +
        "<tr>" + "<td class='font_small'>" + tieude.DiaChi + "</td></tr>" +
        "<tr>" + "<td class='font_small'>Số điện thoại: " + tieude.SoDT + "</td></tr>" +
        "<tr>" + "<td class='small' colspan='3'>Thời gian chỉ định: " + benhnhan.TGChiDinh + "&nbsp;&nbsp;-&nbsp;&nbsp;Thời gian nhận bệnh phẩm: " + benhnhan.TGCapMa + "&nbsp;&nbsp;-&nbsp;&nbsp;Thời gian có kết quả: " + benhnhan.TGIn + "</td></tr>";
        //"<tr>" + "<td style='width:60%' class='small'>Thời gian nhận bệnh phẩm: " + benhnhan.TGCapMa + "</td></tr>";
    header += "</table>";

    header += "<p id='headerText' class='font_small_center'>PHIẾU TRẢ KẾT QUẢ XÉT NGHIỆM</p>";

    header += "<table border='0' class='font_normal_left' style='width:100%;'>" +
        //"<tr>" + "<td>Thời gian chỉ định: " + benhnhan.TGChiDinh + "</td>" + "<td>Thời gian nhận bệnh phẩm: " + benhnhan.TGCapMa + "</td>" + "</tr>" +
        "<tr>" + "<td>Họ tên: <strong>" + benhnhan.HoTen + "</strong></td>" + "<td>Năm sinh: " + benhnhan.NamSinh + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Giới tính: " + (benhnhan.GioiTinh == true ? "Nam" : "Nữ") + "</td>" + "<td>Xét nghiệm: " + (benhnhan.CapCuu == true ? "Cấp cứu" : "Thường") + "</td></tr>" +
        "<tr><td colspan='3'>Địa chỉ: " + benhnhan.DiaChi + "</td></tr>" +
        "<tr><td>Khoa chỉ định: " + benhnhan.NoiChiDinh + "</td><td colspan='2'>Người chỉ định: " + benhnhan.NguoiChiDinh + "</td></tr>" +
        "<tr><td colspan='3'>Chuẩn đoán: " + benhnhan.ChanDoan + "</td></tr>";
    header += "</table>";

    header += "</div>";
    $("#pagePrint").append(header);

    var now = new moment();
    //--------------------------------------------------Footer--------------------------------------------------------//
    if (nguoiin == undefined) {
        var footer = "<div id='Footer'><table style = 'width:100%'>" +
    "<tr><td style='height:5px'></td></tr>" +
    "<td colspan='2' style='padding: 2px 2px 2px 2px; text-align:left; width:100%'> Ghi chú: " + nullToString(benhnhan.KetLuan) + "</td>" +
    "<tr><td style='width:55%'></td><td style='width:55%'>Ngày " + date[D.getDate()] + "/" + month[D.getMonth()] + "/" + D.getFullYear() + "   " + now.format("HH:mm:ss") + "</td>" +
    "<tr><td style='width:55%'></td><td style='width:50%; text-align:center'>Trưởng khoa xét nghiệm</td></tr>" +
    "<tr><td style='height:80px'></td></tr>" +
    "<tr><td style='width:55%'></td><td style='width:55%'></td></tr>";
        footer += "</table></div>";
    }
    else {
        var footer = "<div id='Footer'><table style = 'width:100%'>" +
            "<tr><td style='height:5px'></td></tr>" +
            "<td colspan='2' style='padding: 2px 2px 2px 2px; text-align:left; width:100%'> Ghi chú: " + nullToString(benhnhan.KetLuan) + "</td>" +
            "<tr><td style='width:55%'></td><td style='width:55%'>Ngày " + date[D.getDate()] + "/" + month[D.getMonth()] + "/" + D.getFullYear() + "   " + now.format("HH:mm:ss") + "</td>" +
            "<tr><td style='width:55%; text-align:center'>Người thực hiện</td><td style='width:50%; text-align:center'>Trưởng khoa xét nghiệm</td></tr>" +
            "<tr><td style='height:80px'></td></tr>" +
            "<tr><td style='width:55%'></td><td style='width:55%'><strong>" + (nguoiin.HoTen == "" ? "" : nguoiin.HoTen) + "</strong></td></tr>";
        footer += "</table></div>";
    }
    //------------------------------------------------Main content----------------------------------------------//
    var main = "<div id='mainContent' style='width:100%;'>";
    main += "<table id='tbxn'>";
    main += "<table id='tbxn'>" +
        "<tr>" +
        "<th style='width:50%;background-color: lightgray;'>Tên xét nghiệm</th>" +
        "<th style='width:15%'>Kết quả</th>" +
        "<th style='width:15%'>Đơn vị</th>" +
        "<th style='width:auto'>Khoảng tham chiếu</th>" +
        "</tr>";


    var nhomxn = "";
    var list_nhomxn = "";
    var table_number = 1;
    var count = dskq.length - 1;
    var count_row = 0;
    var numberRow_perPage = 27;

    $.each(dskq, function (index, kq) {
        if (nhomxn != kq.NhomXN) {
            nhomxn = kq.NhomXN;
            if (nhomxn == "HH") {
                kq.NhomXN = "Huyết học";
            }
            else if (nhomxn == "SH") {
                kq.NhomXN = "Sinh hóa";
            }
            else if (nhomxn == "VS") {
                kq.NhomXN = "Vi sinh";
            }
            else if (nhomxn == "MD") {
                kq.NhomXN = "Miễn dịch";
            }
            else if (nhomxn == "NT") {
                kq.NhomXN = "Nước tiểu";
            }
            list_nhomxn += kq.NhomXN;
            main += "<tr><td colspan='4'><strong>" + kq.NhomXN + "</strong></td></tr>";          
            count_row++;
        }
        if (kq.XNChinh == true) {
            var chiso = test_result(nullToString(kq.KetQua), nullToString(kq.GHDuoi), nullToString(kq.GHTren));
            if (chiso == "H") {
                main += "<tr><td style='width:50%; text-align: left;'><strong>" + kq.TenXetNghiem + "</strong></td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
            }
            else if (chiso == "L") {
                main += "<tr><td style='width:50%; text-align: left;'><strong>" + kq.TenXetNghiem + "</strong></td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
            }
            else {// normal
                main += "<tr><td style='width:50%; text-align: left;'><strong>" + kq.TenXetNghiem + "</strong></td><td class='normal_center' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
            }
            count_row++;
        }
        else {
            if (kq.TenXetNghiem.indexOf("  ") != -1) {
                var chiso = test_result(nullToString(kq.KetQua), nullToString(kq.GHDuoi), nullToString(kq.GHTren));
                if (chiso == "H") {
                    main += "<tr><td style='width:50%;text-align:left; padding-left:50px;'>" + kq.TenXetNghiem + "</td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                else if (chiso == "L") {
                    main += "<tr><td style='width:50%; text-align:left;padding-left:50px;'>" + kq.TenXetNghiem + "</td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                else {// normal
                    main += "<tr><td style='width:50%; text-align:left;padding-left:50px;'>" + kq.TenXetNghiem + "</td><td class='normal_center' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                count_row++;
            }
            else {
                var chiso = test_result(nullToString(kq.KetQua), nullToString(kq.GHDuoi), nullToString(kq.GHTren));
                if (chiso == "H") {
                    main += "<tr><td style='width:50%; text-align: left;'>&nbsp;&nbsp;&nbsp;-&nbsp;" + kq.TenXetNghiem + "</td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                else if (chiso == "L") {
                    main += "<tr><td style='width:50%; text-align: left;'>&nbsp;&nbsp;&nbsp;-&nbsp;" + kq.TenXetNghiem + "</td><td class='outOfnormal' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                else {// normal
                    main += "<tr><td style='width:50%; text-align: left;'>&nbsp;&nbsp;&nbsp;-&nbsp;" + kq.TenXetNghiem + "</td><td class='normal_center' style='width:15%'>" + kq.KetQua + "</td></td><td style='width:15%'>" + kq.DonVi + "</td></td><td style='width:auto'>" + kq.ChiSoBinhThuong + "</td></tr>";
                }
                count_row++;
            }
        }

        if (count_row == (numberRow_perPage * table_number) && count > (numberRow_perPage * table_number)) {
            main += "</table>";
            main += "</div>";
            $("#pagePrint").append(main);
            main = "<div id='mainContent' style='width:100%;'>";
            main += "<table id='tbxn'>" +
                "<tr>" +
                "<th style='width:55%'>Tên xét nghiệm</th>" +
                "<th style='width:15%'>Kết quả</th>" +
                "<th style='width:15%'>Đơn vị</th>" +
                "<th style='width:15%'>CSBT</th>" +
                "</tr>";

            $("#pagePrint").append(footer);
            $("#pagePrint").append("<div id='pagenumber'>Trang " + table_number + "</div>");
            $("#pagePrint").append("<div id='footertext'>Lưu ý: Kết quả nằm ngoài khoảng tham chiếu sẽ được tô đậm, in nghiêng.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đề nghị gặp bác sĩ chuyên khoa để được tư vấn.</div>");
            $("#pagePrint").append("<div style='page-break-after:always;'>&nbsp;</div>");
            $("#pagePrint").append(header);
            table_number = table_number + 1;

            JsBarcode("#imgMABN", benhnhan.MaBN);
            JsBarcode("#imgMABP", _mabp);
        }
    });

    //----------------------------------------------Footer------------------------------------------------------------//
    main += "</table>";
    main += "</div>";
    $("#pagePrint").append(main);
    $("#pagePrint").append(footer);
    $("#pagePrint").append("<div id='footertext'>Lưu ý: Kết quả nằm ngoài khoảng tham chiếu sẽ được tô đậm, in nghiêng.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đề nghị gặp bác sĩ chuyên khoa để được tư vấn.</div>");
    if (count > numberRow_perPage) {
        $("#pagePrint").append("<div id='pagenumber'>Trang " + table_number + "</div>");
        //$("#pagePrint").append("<div id='footertext'>Lưu ý: Kết quả nằm ngoài khoảng tham chiếu sẽ được tô đậm, in nghiêng.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đề nghị gặp bác sĩ chuyên khoa để được tư vấn.</div>");
    }

    
    //----------------------------------------------------------------------------------------------------------//

    //if (list_nhomxn.length < 10) {
    //    if (nhomxn == "HH") {
    //        $("p#headerText").text("PHIẾU TRẢ KẾT QUẢ XÉT NGHIỆM HUYẾT HỌC");
    //    }
    //    else if (nhomxn == "SH") {
    //        $("p#headerText").text("PHIẾU TRẢ KẾT QUẢ XÉT NGHIỆM SINH HÓA");
    //    }
    //    else if (nhomxn == "VS") {
    //        $("p#headerText").text("PHIẾU TRẢ KẾT QUẢ XÉT NGHIỆM VI SINH");
    //    }
    //    else if (nhomxn == "MD") {
    //        $("p#headerText").text("PHIẾU TRẢ KẾT QUẢ XÉT NGHIỆM MIỄN DỊCH");
    //    }
    //}
}





function stander_fload_int(value) {
    var dtRegex = new RegExp('^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$');   //^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$//   (([1-9][0-9]*\.?[0-9]*)|(\.[0-9]+))([Ee][+-]?[0-9]+)?
    return dtRegex.test(value);
}


function test_result(ketqua, ghduoi, ghtren) {
    var chiso = "";
    if (stander_fload_int(ketqua)) {
        var _ghduoi = parseFloat(ghduoi);
        var _ghtren = parseFloat(ghtren);
        var _ketqua = parseFloat(ketqua);
        if (ghduoi == "0" && ghtren == "0") {
            chiso = "N";
        }
        else if (_ketqua < _ghduoi) {
            chiso += "L";
        }
        else if (_ketqua > _ghtren) {
            chiso += "H";
        }
    }
    else {
        if (ketqua.indexOf('POSITIVE') > -1)
            chiso = "H";
        else
            chiso = "N";
    }

    return chiso;

}



function nullToString(value) {
    if (value == null)
        return "";
    else
        return value;
}