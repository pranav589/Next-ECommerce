import Orders from "../../../models/orderModel";
import moment from "moment/moment";
import auth from "@/middleware/auth";
import db from "@/utils/connectDB";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await getSalesData(req, res);
  }
};

const getSalesData = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result?.role === "admin" || result?.root === true) {
      const { startDate, endDate } = req.body;

      function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
          dateArray.push({ date: moment(currentDate).format("DD-MM-YYYY") });
          currentDate = moment(currentDate).add(1, "days");
        }
        return dateArray;
      }

      const extendedDate = getDates(startDate, endDate);
      await db.connect();
      const salesData = await Orders.aggregate([
        {
          $match: {
            dateOfPayment: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $unwind: "$dateOfPayment",
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: {
                  $toDate: "$dateOfPayment",
                },
              },
            },
            total: {
              $sum: "$total",
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: "$total",
          },
        },
      ]);
      extendedDate.forEach((obj) => {
        const elementInArr2 = salesData.find((o) => o.date === obj.date);

        if (elementInArr2) obj.Revenue = elementInArr2.count;
        if (!elementInArr2) obj.Revenue = 0;
      });
      await db.disconnect();
      return res.json({
        status: "success",
        Data: extendedDate,
      });
    }
    return res.status(400).json({ err: "Unauthorized Access" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
