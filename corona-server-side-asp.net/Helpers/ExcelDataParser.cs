using System.ComponentModel;
using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;

namespace corona_server_side_asp.net.Helpers
{
    public class ExcelDataParser
    {
        public static List<Dictionary<string, string>> Parse(string path)
        {
            var result = new List<Dictionary<string, string>>();

            using (var package = new ExcelPackage(new FileInfo(path)))
            {
                if (package.Workbook.Worksheets.Count == 0)
                    throw new InvalidOperationException($"Excel file at '{path}' has no worksheets.");

                var worksheet = package.Workbook.Worksheets[0];
                var colCount = worksheet.Dimension.Columns;
                var rowCount = worksheet.Dimension.Rows;

                // Read headers
                var headers = new List<string>();
                for (int col = 1; col <= colCount; col++)
                {
                    headers.Add(worksheet.Cells[1, col].Text.Trim());
                }

                // Read rows
                for (int row = 2; row <= rowCount; row++)
                {
                    var rowData = new Dictionary<string, string>();
                    for (int col = 1; col <= colCount; col++)
                    {
                        var header = headers[col - 1];
                        var value = worksheet.Cells[row, col].Text.Trim();
                        rowData[header] = value;
                    }
                    result.Add(rowData);
                }
            }

            return result;
        }
    }
}





